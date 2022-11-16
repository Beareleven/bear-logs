<!-- 解析语雀图片 -->
<meta name="referrer" content="no-referrer" />

<a name="tOiGE"></a>
## 什么是DNS？
DNS全称是 `Domain Name System`，域名系统。他是一个由分层`DNS服务器`实现的分布式数据库；他还是一个使得主机能够`查询分布式数据库的应用层协议`，DNS协议`运行在UDP之上`，使用`53`端口。
<a name="v9T63"></a>
## DNS解析过程？
当你在浏览器输入一个url`www.beareleven.cn/index.html`并回车时。为了使用户主机能够将一个HTTP请求报文发送到Web服务器，会经历以下操作：

1. 用户主机上运行着DNS应用到客户端
1. 浏览器从上述URL中抽取出主机名`www.beareleven.cn`,并将这台主机名传给DNS应用到客户端
1. DNS客户端向DNS服务器发送一个包含主机名的请求
   1. 查询进入网络，并且有DNS解析器进行接收
   1. DNS解析器向`根域名服务器`发起查询请求，要求返回顶级域名的地址
      1. `根DNS服务器`会注意到请求地址的前缀并向DNS解析起返回`cn`的`TLD服务器IP地址列表`
   3. DNS解析器向`TLD服务器`发送请求报文
      1. `TLD服务器`接收请求后，会根据域名地址把`权威DNS服务器`的IP地址返回给DNS解析器
   4. 最后，DNS解析器将查询直接发送到`权威DNS服务器`
      1. `权威DNS服务器`将IP地址返回给DNS解析器
   5. `**DNS解析器将会使用IP地址去响应Web浏览器**`
4. DNS客户端最终会收到一份响应报文，其中包含该目标主机的IP地址
4. 浏览器收到目标主机的IP地址后，就可以向位于该IP地址80端口的HTTP服务器进程发起一个TCP连接

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1649988161563-abfa53ed-43f2-4346-ac4e-a4ec89433210.png#clientId=ue0b09e34-d4d3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=339&id=u4a3eb718&margin=%5Bobject%20Object%5D&name=image.png&originHeight=678&originWidth=1304&originalType=binary&ratio=1&rotation=0&showTitle=false&size=199165&status=done&style=none&taskId=uef4fd1da-47da-4ace-9c04-7a53b8ee9a1&title=&width=652)
<a name="fsFoC"></a>
## 除了提供IP地址到主机名的转换，DNS还提供了什么服务？

1. 主机别名：有着复杂的主机名的主机能够拥有一个或多个其他别名
1. 邮件服务器别名
1. 负载分配：DNS 也用于冗余的服务器之间进行负载分配。繁忙的站点例如 cnn.com 被冗余分布在多台服务器上，每台服务器运行在不同的端系统之间，每个都有着不同的 IP 地址。由于这些冗余的 Web 服务器，一个 IP 地址集合因此与同一个规范主机名联系。DNS 数据库中存储着这些 IP 地址的集合。由于客户端每次都会发起HTTP请求，所以DNS就会在所有的这些冗余的Web服务器之间循环分配了负载
<a name="QpUmq"></a>
## DNS是如何工作的？
运行在用户主机上的某些应用需要将主机名转换成IP地址。这些应用将调用DNS的客户端，并指明需要被转换的主机名。用户主机上的DNS收到后，会使用`UDP通过53端口`向网络上发送一个查询报文，经过一段时间过后，用户主机上的DNS会收到一个主机名对应的DNS响应报文。
<a name="Ym1ao"></a>
## DNS层次结构

- 根DNS服务器：根服务器会提供TLD（Top- Levle Domain）DNS服务器的IP，如`.com, .cn等等`的IP地址
- 顶级域DNS服务器：对于每个顶级域名如`com, cn, edu, net`等都有TLD服务器或者服务器集群，TLD服务器提供了权威服务器都IP地址
- 权威DNS服务器：在因特网上具有公共可访问的主机，这些主机的组织机构必须提供可供访问的DNS记录，这些记录将主机的名字映射为IP地址
<a name="bcdYU"></a>
## DNS查询类型有什么？递归查询？迭代查询？

- 迭代查询：在迭代查询中，如果所查询的 DNS 服务器与查询名称不匹配，则其将返回对较低级别域名空间具有权威性的 DNS 服务器的引用。然后，DNS 客户端将对引用地址进行查询。此过程继续使用查询链中的其他 DNS 服务器，直至发生错误或超时为止

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1649997548271-b17745ca-573f-46cc-b077-cffc174aa3d5.png#clientId=ue0b09e34-d4d3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=374&id=uddeb322b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=747&originWidth=1304&originalType=binary&ratio=1&rotation=0&showTitle=false&size=236822&status=done&style=none&taskId=ubd592759-8c66-479e-87cd-7a8b9cc8221&title=&width=652)

- 递归查询：在递归查询中，DNS 客户端要求 DNS 服务器（一般为 DNS 递归解析器）将使用所请求的资源记录响应客户端，或者如果解析器无法找到该记录，则返回错误消息。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1649997541035-dea6f7f3-698f-4435-8353-eeb46ee556cc.png#clientId=ue0b09e34-d4d3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=338&id=V7vyw&margin=%5Bobject%20Object%5D&name=image.png&originHeight=675&originWidth=1304&originalType=binary&ratio=1&rotation=0&showTitle=false&size=183131&status=done&style=none&taskId=u81a62535-4ca4-4c22-b33b-b5ca3bf6cc1&title=&width=652)

<a name="XdERc"></a>
## DNS缓存
DNS缓存也叫DNS解析器缓存，是由操作系统维护的临时数据库，包含有最近的网站和其他Internet域的访问记录。也就是说，DNS缓存是计算机为了满足快速的响应速度而把加载过的资源缓存起来，再次访问时可以直接快速引用的一项技术和手段。
<a name="m9BcC"></a>
### DNS缓存的工作流程
在浏览器向外部发出请求之前，计算机会拦截每个请求并在 DNS 缓存数据库中查找域名，该数据库包含有最近的域名列表，以及 DNS 首次发出请求时 DNS 为它们计算的地址。
<a name="TKxGc"></a>
### DNS的缓存方式
DNS数据可以缓存到各种不同的位置上，每个位置均将存储DNS记录，他的生存时间由TTL（DNS字段）来决定
<a name="Upfuj"></a>
#### 浏览器缓存
现如今的 Web 浏览器设计默认将 DNS 记录缓存一段时间。因为越靠近 Web 浏览器进行 DNS 缓存，为检查缓存并向 IP 地址发出请求的次数就越少。发出对 DNS 记录的请求时，浏览器缓存是针对所请求的记录而检查的第一个位置。
<a name="xSYbP"></a>
#### 操作系统内核缓存
在浏览器缓存查询后，会进行操作系统级 DNS 解析器的查询，操作系统级 DNS 解析器是 DNS 查询离开你的计算机前的第二站，也是本地查询的最后一个步骤。
<a name="Cq37g"></a>
## DNS安全
几乎所有的网络请求都会经过 DNS 查询，而且 DNS 和许多其他的 Internet 协议一样，系统设计时并未考虑到安全性，并且存在一些设计限制，这为 DNS 攻击创造了机会。

1. Dos攻击：这种攻击的主要形式是**使重要的 DNS 服务器比如 TLD 服务器或者根域名服务器过载**，从而无法响应权威服务器的请求，使 DNS 查询不起作用
1. DNS欺骗：通过改变 DNS 资源内容，比如**伪装一个官方的 DNS 服务器，回复假的资源记录**，从而导致主机在尝试与另一台机器连接时，连接至错误的 IP 地址
1. DNS劫持：在 DNS 劫持中，攻击者**将查询重定向到其他域名服务器**。这可以通过恶意软件或未经授权的 DNS 服务器修改来完成。尽管结果类似于 DNS 欺骗，但这是完全不同的攻击，因为它的目标是名称服务器上网站的 DNS 记录，而不是解析程序的缓存
1. DDoS攻击：也叫做分布式拒绝服务带宽洪泛攻击，这种攻击形式相当于是 Dos 攻击的升级版
<a name="Kk2KP"></a>
### DNSSEC
DNSSEC 又叫做 DNS 安全扩展，DNSSEC 通过对数据进行数字签名来保护其有效性，从而防止受到攻击。它是由 IETF 提供的一系列 DNS 安全认证的机制。**DNSSEC 不会对数据进行加密，它只会验证你所访问的站点地址是否有效。**
<a name="Cd9to"></a>
### DNS防火墙
有一些攻击是针对服务器进行的，这就需要 DNS 防火墙的登场了，DNS 防火墙是一种可以为 DNS 服务器提供许多安全和性能服务的工具。**DNS 防火墙位于用户的 DNS 解析器和他们尝试访问的网站或服务的权威名称服务器之间。防火墙提供限速访问，以关闭试图淹没服务器的攻击者**。如果服务器确实由于攻击或任何其他原因而导致停机，则 DNS 防火墙可以通过提供来自缓存的 DNS 响应来使操作员的站点或服务正常运行。

<Vssue :title="$title" :issue-id="5"/>




