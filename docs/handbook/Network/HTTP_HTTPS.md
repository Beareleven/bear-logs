<!-- 解析语雀图片 -->
<meta name="referrer" content="no-referrer" />

<a name="X6W8V"></a>
### 什么是HTTP？
- HTTP是一个在计算机世界里专门做两点之间传输文字、图片、视频等超文本数据的**约定和规范**

HTTP是 Hyper Text Transfer Protocol （超文本传输协议）的缩写，是一个基于请求与响应，无状态的，应用层的协议，常基于TCP/IP协议传输数据，是互联网上应用最为广泛的一种网络协议,所有的WWW文件都必须遵守这个标准。
<a name="QsTaj"></a>
### HTTP的特点？

1. 无状态：协议对客户端没有状态存储，对事物处理没有“记忆”能力，比如访问一个网站需要反复进行登录操作
1. 无连接：HTTP/1.1之前，由于无状态特点，每次请求需要通过TCP三次握手四次挥手，和服务器重新建立连接。比如某个客户机在短时间多次请求同一个资源，服务器并不能区别是否已经响应过用户的请求，所以每次需要重新响应请求，需要耗费不必要的时间和流量。
1. 基于请求和响应：基本的特性，由客户端发起请求，服务端响应
1. 通信使用明文、请求和响应不会对通信方进行确认、无法保护数据的完整性
<a name="o7ou7"></a>
### HTTP请求的常用方法有哪些？

1. GET：向服务器获取资源
1. POST：将实体提交到指定的资源，通常会造成服务器资源的修改
1. PUT：上传文件，更新数据
1. DELETE：删除服务器上的对象
1. HEAD：获取报文首部，跟GET相比，不返回报文主体部分
1. OPTIONS：询问支持的请求方法，用来跨域请求
1. CONNECT：要求在与代理服务器通信时建立隧道，使用隧道进行TCP通信
1. TRACE：回显服务器收到的请求，主要用于测试或诊断
<a name="y5YfL"></a>
### 请求方法Get和Post有什么区别？
<a name="BvxM6"></a>
#### 本质区别

1. 请求行不同
   1. GET：GET/ url HTTP1.1
   1. POST：POST / url HTTP1.1
2. 对服务器资源的操作不同
   1. GET表示从服务器拉取资源，是一个幂等的操作
   1. POST表示从指定的服务器资源提交数据，是一个非幂等操作

而其他的区别都是一些约定或者说是习惯的区别，比如：

1. GET请求的参数一般都会带在URL后面，并且因为服务器对于长URL需要消耗比较多的资源和URL对所有人来说是可见的，因此会对URL的长度进行限制。但是GET请求的参数也是可以像POST一样携带到请求体里的，相反，POST的参数也是可以直接携带URL之后的，只是为了安全考虑，放在请求体里会相对安全一些而已。
1. GET请求会被浏览器主动缓存，POST则需要手动设置。
1. GET可以在浏览器进行前进和回退，而POST使用前进会退则会重复提交表单。
1. POST的编码类型比GET更多样。
<a name="jRseZ"></a>
#### 还有一种说法，POST请求会产生两个TCP数据包？
在学习的过程，看到部分文章说POST会将header和body分别发送，先发送header，服务端返回状态码100 continue后再发送body。因为之前没听说过这样的说法，因此打算深入研究一下。<br />**http协议中并没有明确说明POST会产生两个数据包，因为我自己没有抓包的工具，但也有其他的博客在讨论这个问题，他们在实际测试中（chrome，firefox）中发现，POST请求并不会把header和body分开发送。**<br />**应该说：一般情况下 无论get、post 客户端只发一次HTTP请求。特殊情况下，POST 请求发送2次HTTP请求。**如果客户端需要跟服务端确认 一个大的文件上传等场景服务端是否接受，客户端发送试探性的请求，请求头带上 Expect: 100 continue, 这多出来一个 HTTP 请求，而不是多一个tcp 数据包**
<a name="QNNtV"></a>
### 什么是长连接和短连接？
使用TCP协议时，会在客户端和服务器之间建立一条虚拟的信道，这条虚拟信道就是指连接，而建立这条连接需要3次握手，拆毁这条连接需要4次挥手，**可见，我们建立这条连接是有成本的，这个成本就是效率成本，简单点说就是时间成本**，你要想发送一段数据，必须先3次握手（来往3个包），然后才能发送数据，发送完了，你需要4次挥手（来往4个包） 来断开这个连接。

- 而在HTTP1.0时代，客户端和服务端的通信都是短连接的，这意味着每一次的HTTP请求都要建立TCP连接。也就是说，每一个HTTP请求的都会有一个TCP连接建立和销毁连接的过程，这对于性能和带宽来说是比较浪费的。
- 到了HTTP1.1时代以后，引入了持久连接（长连接），即`connection:keep-alive`，即TCP连接默认不关闭，可以被多个HTTP请求复用。
   - 减少了TCP连接的重复建立和断开造成的额外开销，减轻了服务器端的负载。
   - 使得HTTP请求和响应能够更早的结束，这样web页面的显示速度也就对应的提高了。
   - 虽然HTTP1.1版本允许复用TCP连接，但是同一个TCP连接里面，所有的数据通信是按照次序进行的，所以服务器只有处理完一个响应，才会进行下一个响应，如果前面的响应特别慢，后面就会有许多请求排队等待着，这就称之为队头阻塞。

![截屏2022-02-28 下午11.05.10.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646060717477-44a3d07d-140e-48af-b088-4b9390ded9fd.png#clientId=u47b04ccf-6dc0-4&crop=0&crop=0&crop=1&crop=1&from=drop&height=625&id=u2de316f6&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-02-28%20%E4%B8%8B%E5%8D%8811.05.10.png&originHeight=1060&originWidth=972&originalType=binary&ratio=1&rotation=0&showTitle=false&size=176349&status=done&style=none&taskId=u34dd6397-22be-4a53-bd40-debeecc0418&title=&width=573)<br />![截屏2022-02-28 下午11.35.23.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646062544634-083a478b-cf16-4f5a-9e6d-6b9f2117b649.png#clientId=u47b04ccf-6dc0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=530&id=u5d877b93&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-02-28%20%E4%B8%8B%E5%8D%8811.35.23.png&originHeight=1060&originWidth=970&originalType=binary&ratio=1&rotation=0&showTitle=false&size=141958&status=done&style=none&taskId=ue7eff362-3e23-462e-a30c-2950f2a5e48&title=&width=485)
<a name="DHbt5"></a>
### HTTP1.0/1.1/2.0 VS HTTPS?

- 自HTTTP1.0开始，任何格式的内容都可以发送，这使得互联网不仅可以传输文字，还能传输图像、视频、二进制文件等，为互联网的发展奠定了基础。并且相比较于0.9，1.0引入了POST和HEAD请求，丰富了浏览器与服务器交互的手段。还新增了状态码、缓存、权限等其他功能。
   - 但1.0版本的缺点是，每个TCP连接只能发送一个请求，也就是说，每一个HTTP请求都会有一个TCP连接建立和销毁连接的过程，这对于性能和带宽来说是比较浪费的。因此，HTTP1.1版本就主要解决了这个问题。
- HTTP1.1相对于HTTP1.0主要做了一些优化
   - **长连接**：在HTTP1.1中默认开启`Connection：keep-alive`，这表示在一个TCP连接上可以传送多个HTTP请求或响应，减少了建立和关闭连接的性能消耗和延迟，一定程度上解决了HTTP1.0每次请求都要创建连接的缺点。但是，**1.1虽然允许复用TCP连接，但在同一个TCP连接中，所有的数据通信都是按次序进行的**，服务器只有处理完一个回应，才会进行下一个回应，假如排在前面的回应会慢，那么后面的就需要一直排队等待，**也就导致了队头堵塞问题。**
   - **缓存处理：**在1.0中主要使用header中的`If-Modified-Since,Expires`来做缓存判断的标准，（`Expire有个缺点，它判断是否过去是用本地时间来判断的，而本地时间是可以人为修改的`）HTTP1.1 则引入了更多的缓存控制策略例如`Entity tag，If-Unmodified-Since, If-Match, If-None-Match`等更多可供选择的缓存头来控制缓存策略。
   - **带宽优化及网络连接的使用**：HTTP1.1在请求头中引入了range头域，它允许只请求资源的某个部分，优化了1.0中一些浪费带宽的现象。
   - 新增了多个错误状态响应码
   - 新增了多个请求方法，如OPTION、PUT等
   - **Host头处理**：1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求的消息中的URL并没有传递主机名。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机，并且他们共享一个IP地址，因此有了host字段，这样就可以将请求发往到同台服务器上的不同网站
- 1.1中还存在的问题
   - 队头堵塞
   - header携带的内容过大且每次请求的header基本不怎么变化，一定程度上增加了传输的成本
   - 使用`keep-alive`来弥补多次创建产生的延迟，但对于没必要保持的请求，它在请求结束之后还保持了不必要的连接很久，如果数量多的话，也会影响性能。
- HTTP2.0则是基于HTTP1.1做了一些优化
   - 首先2.0实现了二进制分帧：所有帧都采用二进制编码
      - **帧**：客户端与服务器通过交换帧来通信，帧是基于这个新协议通信的最小单位。帧的概念是2.0实现多路复用的基础
      - **消息**：是指逻辑上的 HTTP 消息，比如请求、响应等，由一或多个帧组成。
      - **流**：流是连接中的一个虚拟信道，可以承载双向的消息；每个流都有一个唯一的整数标识符（1、2…N）；
      - **每个数据流都以消息的形式发送，而消息又由一个或多个帧组成**。 **帧是流中的数据单位。一个数据报的 header 帧可以分成多个 header 帧，data 帧可以分成多个 data 帧。**
   - 基于二进制分帧实现了多路复用，以此来解决1.1中的队头阻塞问题。在一个TCP连接里，客户端和服务器可以同时发送多个请求或回应，并且不用按照顺序一一发送。这是因为2.0中使用了数据流的概念，每个请求或回应的所有数据包称为一个数据流，并且多个数据流可以并行在同一个TCP连接上交换信息，每一个数据流都有一个独一无二的编号。流中的每一帧都会有一个stream identifier的字段来标明这一帧是属于哪一个数据流，在数据流里，每一帧发送的顺序是很关键的。接收方会按照收到帧的顺序来和stream identifier字段来拼接每个数据流中的所有帧组成一整块数据。
   - 头信息压缩：
      - 由于1.1协议是无状态的，每次请求都必须附上所有信息。因此，请求都很多字段都是重复的，例如Cookie和User Agent。这样会浪费很多带宽，也影响速度。
      - 2.0对此做了优化，引入了头信息压缩机制。一方面头信息使用gzip或者compress压缩后发送；另一个方面，客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不用发送同样字段了，只发送索引号，这样就能提高速度了
   - 服务器推送：2.0允许服务器未经请求，主动向客户端发送资源，这就是服务器推送。使用服务器推送提前给客户端推送必要的资源，可以减少一些延迟时间。2.0推送的是静态资源，与Websocket和SSE推送的即时数据不同
<a name="kzQlu"></a>
### HTTP安全吗？
不安全，HTTP协议采用明文传输信息，存在**信息窃听，信息篡改和信息劫持**的风险。
<a name="i9bHk"></a>
### 什么是HTTPS？

- HTTPS是一个在计算机世界里专门在两点之间安全地传输文字、图片、视频等超文本数据等约定和规范

HTTPS是HyperText Transfer Protocol Secure的缩写，它用来做计算机网络上的两个短系统之间进行安全的交换信息，相当于做HTTP的基础上加了一个Secure的单词。HTTPS是HTTP的一种扩展，它本身并不保证传输的安全性，在HTTPS中，使用TLS/SSL对通信协议进行加密，也就说：HTTP + SSL/TLS = HTTPS

- HTTP基于 TCP 协议，TCP 三次握手之后即可开始 HTTP 通信；HTTPS 是在 HTTP 与 TCP 之间加了一个 SSL/TLS 安全层，在 TCP 握手之后，还要进行 SSL 握手，才可以开始通信。

![截屏2022-03-01 下午1.17.06.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646111832324-f8700bac-8cb4-447a-a47a-fd08d3302ac1.png#clientId=u47b04ccf-6dc0-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=udb3d7baf&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-01%20%E4%B8%8B%E5%8D%881.17.06.png&originHeight=450&originWidth=1162&originalType=binary&ratio=1&rotation=0&showTitle=false&size=138326&status=done&style=none&taskId=u6ea933ff-4478-4d86-ba3a-4906fa30e81&title=)<br />![截屏2022-03-02 下午9.55.29.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646229358016-fec353a5-c506-46df-8c03-fa979df8d3ab.png#clientId=uc3818956-602f-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=381&id=u1dfe83ec&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-02%20%E4%B8%8B%E5%8D%889.55.29.png&originHeight=762&originWidth=1138&originalType=binary&ratio=1&rotation=0&showTitle=false&size=165988&status=done&style=none&taskId=ufd8d4cfc-9839-466c-b41c-612a0236f68&title=&width=569)
<a name="jPCEB"></a>
### HTTPS的原理？
<a name="qJl0n"></a>
#### 什么是对称加密和非对称加密？

- 对称加密：顾名思义就是指加密和解密使用的密钥都是同样的密钥，只要保证了密钥的安全性，那么整个通信过程也就是具有了机密性。

![截屏2022-03-01 下午1.30.54.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646112662164-98bccc22-02bd-4079-bd22-0c14577de90d.png#clientId=u47b04ccf-6dc0-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u3f6d912c&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-01%20%E4%B8%8B%E5%8D%881.30.54.png&originHeight=528&originWidth=1300&originalType=binary&ratio=1&rotation=0&showTitle=false&size=133353&status=done&style=none&taskId=uc0b113dd-0f1f-4956-a146-c2f94687a54&title=)

- 非对称加密：简单来说就是加密和解密使用的密钥不是同一个。非对称加密中有两个密钥，一个是公钥，一个是私钥，公钥进行加密，私钥进行解密（反之，私钥进行加密公钥也可以解开），公钥可供任何人使用，私钥只有自己知道。公钥不需要具有安全性，因为公钥需要在网络中进行传输，非对称加密可以解决`密钥交换`的问题。
   - 非对称加密有一个缺点就是加密的速度很慢，假使每一次加密都使用非对面加密，那么等待的时间会很长。

![截屏2022-03-01 下午1.38.36.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646113123896-d37fd208-1f75-4775-9b6b-9a875e338b29.png#clientId=u47b04ccf-6dc0-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u62c4e7a5&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-01%20%E4%B8%8B%E5%8D%881.38.36.png&originHeight=786&originWidth=1180&originalType=binary&ratio=1&rotation=0&showTitle=false&size=313695&status=done&style=none&taskId=u71906eef-8ae3-47c1-a2e4-d41455da189&title=)

<a name="QKRHl"></a>
#### 什么是SSL/TLS？
TLS（Transfer Layer Security 传输层安全协议）是SSL（Secure Socket Layer）的后续版本，是用于中互联网两台计算机之间用于`身份验证` 和 `加密`的一种协议。是介于TCP和HTTP之间的一层安全协议，不会影响原有的TCP和HTTP。

- TLS/SSL的功能实现主要依赖三类基本算法：散列函数hash、对称加密、非对称加密 
   1. 非对称加密实现身份认证和密钥协商
   1. 对称加密采用非对称加密协商的密钥的进行加密
   1. 基于散列函数验证信息的完整性

![截屏2022-03-01 下午1.49.37.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646113785970-54cc4295-108e-4110-98c0-e92b22f06d11.png#clientId=u47b04ccf-6dc0-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u05042717&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-01%20%E4%B8%8B%E5%8D%881.49.37.png&originHeight=604&originWidth=1160&originalType=binary&ratio=1&rotation=0&showTitle=false&size=531252&status=done&style=none&taskId=ud7588318-ed5b-4b72-8b33-9e025020169&title=)
<a name="DZxbj"></a>
#### 什么是数字签名？
数字签名是用于验证信息的完整性的。信息传输的途中，我们的信息很有可能被第三方劫持篡改，所以我们需要保证信息的完整性，通用方法是使用散列算法如SHA1，MD5将传输内容hash一次获得hash值，即摘要。客户端使用服务端的公钥对摘要和信息内容进行加密，然后传输给服务端，服务端使用私钥进行解密获得原始内容和摘要值，这时服务端使用相同的hash算法对原始内容进行hash，然后与摘要值比对，如果一致，说明信息是完整的。<br />![截屏2022-03-01 下午2.03.26.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646114611388-a7b8c4d0-669c-4c65-a8fc-1ba2f7314709.png#clientId=u47b04ccf-6dc0-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=udb597da0&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-01%20%E4%B8%8B%E5%8D%882.03.26.png&originHeight=472&originWidth=1336&originalType=binary&ratio=1&rotation=0&showTitle=false&size=327156&status=done&style=none&taskId=u1a71cfed-5b5a-4a5a-94e0-2853f4fb1f2&title=)
<a name="TZc82"></a>
#### 什么是数字证书？
数字证书是用于验证发送方的身份的。也就是数字签名的认证问题，因为私钥是自己的，公钥是谁都可以发布，所以必须发布经过认证的公钥，才能解决公钥的信任问题。![截屏2022-03-01 下午2.06.53.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646114819162-0e65817c-d3e8-493c-8b4d-f21d99a7d926.png#clientId=u47b04ccf-6dc0-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u16f61268&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-01%20%E4%B8%8B%E5%8D%882.06.53.png&originHeight=592&originWidth=1262&originalType=binary&ratio=1&rotation=0&showTitle=false&size=141331&status=done&style=none&taskId=uc668e621-6090-4094-bbcb-0d58aa17f4a&title=)

- 数字证书是由权威的CA（Certificate Authority）机构给服务端进行颁发，CA机构通过服务端提供的相关信息生成证书，证书内容包含了持有人的相关信息，服务器的公钥，签署者签名信息（数字签名）等，最重要的是公钥在数字证书中。
<a name="NbDXa"></a>
##### HTTPS是怎么保证安全的？

- HTTPS使用了对称加密和非对称加密两种加密方法混合加密，在通信刚开始时使用非对称加密算法，首先解决密钥交换的问题。后续再使用对称加密进行通信。
- 引入了数字证书来实现身份认证和不可否认性，数字证书就是可信任的权威机构CA颁发的服务器相关信息和其公钥。服务器通过向客户端提供证书来证明自己的身份。CA的公钥是公开的，客户端拿到证书后用CA公钥解开就可以拿到服务器公钥了。
- 使用了摘要算法保证了数据的完整性，摘要算法可以看作是单向的不可逆的加密算法，无法通过加密后的得到的摘要去逆推得到原文。HTTPS将要发送的信息经过加密算法形成一个摘要，再将摘要用私钥进行加密和原文等其他内容形成数字签名一起发送到客户端。使用私钥加密是因为黑客可以在修改数据内容的同时也修改摘要，但如果使用私钥加密，黑客没有私钥，就算修改了内容和摘要，也无法对其进行加密，这样客户端拿到数字签名之后就无法用公钥进行解密，也就会发现信息被篡改了。客户端拿到之后对数字签名进行解密并对原文使用同样的摘要算法进行加密得到第二个摘要，再将两个摘要进行对比，就可以校验数据的完整性了
- **机密性**：使用对称/非对称加密混合加密的方法实现了机密性
- **数据完整性**：使用摘要算法来保证数据完整性
- **身份认证**：使用CA颁发的数字证书来证明这个公钥确实是某某服务器的公钥。
- **不可否认**：如果能用某某服务器的公钥解开数字签名，就说明这个消息只能是某某服务器发出的，不可能是别人冒充的，因为只有配对的公钥能解开唯一的私钥加密过的文件。

<Vssue :title="$title" :issue-id="6"/>
<meta name="referrer" content="no-referrer" />


