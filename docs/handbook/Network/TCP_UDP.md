<!-- 解析语雀图片 -->
<meta name="referrer" content="no-referrer" />


<a name="DctAE"></a>
### 什么是TCP？
TCP是`Transfer Control Protocol 传输控制协议`的缩写，**是一个面向连接的、可靠的、基于字节流的传输层协议。**

- **面向连接**，指的是通信双方的连接，在传输数据之前必须先建立连接，数据传送完成后要释放连接。
- **可靠**，TCP的可靠性体现在两个方面，第一个是有状态，第二个是可控制。
   - **有状态**，TCP会精准记录数据有哪些被发送了，发送的有哪些被接收了，哪些没有被接收到，并且会保证发送的数据包按序到达，不允许半点差错。
   - **可控制**，当TCP意识到丢包了或者网络环境不佳，TCP会根据具体情况调整自己的行为，控制发送速率或者重发。
- **基于字节流**，TCP为了维护状态，把一个个IP包变成了字节流
<a name="DMtW9"></a>
### TCP三次握手，四次挥手
<a name="Kupwg"></a>
#### 建立连接 - 三次握手
在建立一个TCP连接时，需要客户端盒服务端总共发送3个包，也就是所说的三次握手。三次握手的目的是：**连接服务器指定端口**，**建立TCP连接，并同步连接双方的序列号和确认号**，**交换TCP**`**窗口**`**大小。**<br />建立过程：

1. 连接建立之前，服务端进程要准备接收来自外部的TCP连接，这种打开方式被认为是`被动打开`，之后服务端处理`Listen`状态，等待客户端发起连接请求。
1. 第一次握手：客户端发起`主动打开`，向服务端发起连接请求，向服务器发送一个`SYN报文`，报文中首部的`同步位SYN = 1`，同时选择一个`初始序号 sequence，简写为seq = x`，此时，客户端进行进入了`SYN-SENT（同步已发送状态）`。
   1. TCP规定：`SYN报文段 SYN = 1的报文段不能携带数据，但需要消耗掉一个序号`
3. 第二次握手：服务器**收到客户端的SYN报文**之后，会**以自己的SYN报文作为应答**，在确认报文段中，把 `SYN 和 ACK 位`都置为 1 。并且指定服务器端**初始序列号： = y**。同时把客户端的 **seq + 1作为ack（ack = x + 1）** 的值，表示自己已经收到了客户端的SYN报文，此时服务器处于 `**SYN_RCVD（同步收到）**` 状态。
   1. TCP规定：这个确认报文也不能携带数据，也要消耗一个序号。
4. 第三次握手：客户端**收到**服务端**SYN报文之后，会发送一个ACK报文**，确认连接中的 ACK 置为 1 ，序号为 `seq = x + 1`，确认号为 `ack = y + 1`。TCP 规定，这个报文段可以携带数据也可以不携带数据，如果不携带数据，那么下一个数据报文段的序号仍是 `seq = x + 1`。这时，客户端进入` ESTABLISHED (已连接) 状态`
4. 服务端收到ACK报文后，也进入了`ESTABLISHED (已连接) 状态`，此时通信双方就建立起了连接，可以进行通信了。
<a name="CMmla"></a>
##### 为什么不是两次？

- **无法确认客户端的接收能力**
   - 假如是两次握手，客户端第一次向服务端发送SYN报文，但这个包可能由于网络或者某些原因滞留在当前的网络中迟迟没有到达客户端，TCP会以为这是丢了包，于是重传，这次重传通过两次握手建立起了连接。
   - 经过重传后，**双方通信完毕关闭连接**，第一次发送的包，也就是滞留在网络中的包到达了服务端，由于是两次握手，服务端只要接收到了客户端的包然后发送相应的包，就默认建立连接，但此时，客户端已经关闭连接了，这就带了连接资源的浪费
<a name="pnoaJ"></a>
##### 握手过程中可以携带数据吗？
前两次握手不可以携带数据，第三次可以

- 前两个握手的目的就是确认通信双方的接收、发送能力，如果可以携带数据，无法保证数据能否正常到达。并且一旦有人想攻击服务器，那么他只需要在第一次握手中的 SYN 报文中放大量数据，那么服务器势必会消耗更多的**时间**和**内存空间**去处理这些数据，增大了服务器被攻击的风险。
- 第三次握手时，客户端已经处理`ESTABLISHEN`状态，并且已经能够确认通信双方的接收、发送能力，这个时候相对安全，所以可以携带数据

![截屏2022-03-03 下午3.50.56.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646293859977-615758ab-5e05-499d-b8c7-37656448e992.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u5feaa66a&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-03%20%E4%B8%8B%E5%8D%883.50.56.png&originHeight=1150&originWidth=1370&originalType=binary&ratio=1&rotation=0&showTitle=false&size=579307&status=done&style=none&taskId=ua169e322-b281-45fa-ae7d-e4431089abf&title=)
<a name="ItRvq"></a>
#### 释放连接 - 四次握手
双方通信结束之后，客户端和服务端都是处于`ESTABLISHED`状态，双方都可以主动释放连接。假使客户端主动关闭，服务端被动关闭。

1. 第一次挥手：客户端向服务端发送`FIN报文`，报文段中首部`FIN位置为1`，不包含数据，`序列号位seq = u`，此时客户端进入`FIN-WAIT-1（终止等待1）`阶段。
1. 第二次挥手：服务端收到`FIN报文`后，向客户端发送一个`ACK报文`，报文段中`ACK =1，生成自己的序列号位 seq = v，ack = u + 1`，之后服务端进入`CLOSE_WAIT（关闭等待状态）`阶段。
   1. 客户端收到`ACK报文后`，就进入`FIN-WAIT-2（终止等待2）`阶段，等待服务端发送连接释放报文。
   1. 此时TCP连接处于`半关闭状态`客户端无法向服务端发送数据，但是服务端要向客户端发送数据，客户端还是得接受。
3. 第三次挥手：当服务端需要发送给客户端的数据发送完毕后，也想释放连接了，和客户端的第一次挥手一样，会向对方发送一个`FIN报文`，报文段中`ACK = 1，序列号 seq = w，ack = u + 1`，发送完断开连接的报文后，服务端就进入了`LAST-ACK（最后确认）`阶段。
3. 第四次挥手：客户端收到服务端的`FIN报文`后，做出响应，向服务端发送一个`ACK报文`，也就是确认断开，报文段中`ACK = 1，序列号seq = u + 1，ack = w + 1`，然后进入`TIME-WAIT（时间等待）`阶段，这个时候TCP连接还没有释放，必须经过2MSL（最长报文段寿命）的时间后，才进入`CLOSED`状态。
   1. 而服务端收到客户端`ACK报文`就立即进入`CLOSED`状态。
<a name="Wbfl5"></a>
##### 为什么关闭连接时要等待2MSL时间，可以不等待吗？

- 如果直接断开，那么客户端是不能知道服务端是否收到了这次ACK的，所以客户端只能等待，如果服务端这2MSL内真的没有收到最后一次`ACK报文`，就会重新发送一次`FIN报文`。如果没有收到重发的`FIN报文`，就证明服务端收到了最后一次`ACK报文`，此时客户端就能执行关闭了。
- 并且如果直接断开，当服务端还有很多数据包要给客户端发，且还在路上的时候，若客户端的端口此时刚好被新的应用占用，那么就接收到了无用数据包，造成数据包混乱。
<a name="UdbDq"></a>
##### 为什么是四次挥手？
因为服务端在接收到FIN, 往往不会立即返回FIN, 必须等到服务端所有的报文都发送完毕了，才能发FIN。因此先发一个ACK表示已经收到客户端的FIN，延迟一段时间才发FIN。这就造成了四次挥手。并且TCP时连接的全双工的，所以需要双方分别释放连接，故需要四次握手。
<a name="RDmTd"></a>
#### ![截屏2022-03-03 下午7.26.39.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646306803562-4c67f5c0-953f-4ab5-b01a-f13da86dcda5.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=ub1acc06d&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-03%20%E4%B8%8B%E5%8D%887.26.39.png&originHeight=1260&originWidth=1326&originalType=binary&ratio=1&rotation=0&showTitle=false&size=812496&status=done&style=none&taskId=ub94be8db-5fb8-4f52-8e35-dc14f8e3bc7&title=)
<a name="rYW7v"></a>
### 重传机制
TCP实现可靠传输的方式之一，就是通过序列号与确认应答。在TCP中，当发送端的数据到达接收端时，接收端回返回一个确认应答消息，表示已经收到消息。
<a name="I6wzI"></a>
#### 超时重传
就是在发送数据时，设定一个定时器，当超过指定的时间后，没有收到对方的 ACK 确认应答报文，就会重发该数据，也就是我们常说的**超时重传**。<br />有两种情况会发生超时重传：1. 数据包丢失；2. 确认应答丢失![截屏2022-03-04 上午12.20.13.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646324416483-469fc238-8ab6-4b33-ad10-6dc0e143d2c5.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u5e24b3a9&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-04%20%E4%B8%8A%E5%8D%8812.20.13.png&originHeight=982&originWidth=1316&originalType=binary&ratio=1&rotation=0&showTitle=false&size=464325&status=done&style=none&taskId=u4df384c7-bc8f-4b9b-90ad-c8fc7873009&title=)
<a name="YOdos"></a>
###### RTT（Round-Trip Time） 往返时延
RTT 就是**数据从网络一端传送到另一端所需的时间**，也就是包的往返时间。<br />![截屏2022-03-04 上午12.23.19.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646324604248-2573a1cf-d0f3-499e-bd5c-0954da76bd33.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u6eeeaf83&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-04%20%E4%B8%8A%E5%8D%8812.23.19.png&originHeight=1036&originWidth=1230&originalType=binary&ratio=1&rotation=0&showTitle=false&size=434319&status=done&style=none&taskId=u27ce0a30-bef2-45af-bcce-fb3646564c4&title=)<br />超时重传时间是以 RTO （Retransmission Timeout 超时重传时间）表示。<br />假设在重传的情况下，超时时间 RTO 「较长或较短」时，会发生什么事情呢？![截屏2022-03-04 上午12.28.02.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646324889783-1f08cd71-7b86-4af0-bab9-b62260192362.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u40759870&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-04%20%E4%B8%8A%E5%8D%8812.28.02.png&originHeight=752&originWidth=1302&originalType=binary&ratio=1&rotation=0&showTitle=false&size=386158&status=done&style=none&taskId=u7f3a584b-f61e-42be-8ee0-d5e9416d94c&title=)<br />超时时间较长与较短<br />上图中有两种超时时间不同的情况：

- 当超时时间 **RTO 较大**时，重发就慢，丢了老半天才重发，没有效率，性能差；
- 当超时时间 **RTO 较小**时，会导致可能并没有丢就重发，于是重发的就快，会增加网络拥塞，导致更多的超时，更多的超时导致更多的重发。

精确的测量超时时间 RTO 的值是非常重要的，这可让我们的重传机制更高效。<br />根据上述的两种情况，我们可以得知，**超时重传时间 RTO 的值应该略大于报文往返  RTT 的值**。<br />超时触发重传存在的问题是，超时周期可能相对较长。于是便可以用`快速重传`机制来解决超时重发的时间等待问题
<a name="zQxeD"></a>
#### 快速重传
快速重传跟超时重传不同，他**不以时间为驱动，而是以数据来驱动重传。**<br />![截屏2022-03-04 上午12.31.43.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646325109131-81503078-680d-47db-9428-8bfc78718e36.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u05b393d5&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-04%20%E4%B8%8A%E5%8D%8812.31.43.png&originHeight=1160&originWidth=1306&originalType=binary&ratio=1&rotation=0&showTitle=false&size=452894&status=done&style=none&taskId=u965391c7-bcff-486a-8259-8d12438f7c8&title=)
<a name="uHeK6"></a>
##### 
在上图，发送方发出了 1，2，3，4，5 份数据：

- 第一份 Seq1 先送到了，于是就 Ack 回 2；
- 结果 Seq2 因为某些原因没收到，Seq3 到达了，于是还是 Ack 回 2；
- 后面的 Seq4 和 Seq5 都到了，但还是 Ack 回 2，因为 Seq2 还是没有收到；
- **发送端收到了三个 Ack = 2 的确认，知道了 Seq2 还没有收到，就会在定时器过期之前，重传丢失的 Seq2。**
- 最后，接收到收到了 Seq2，此时因为 Seq3，Seq4，Seq5 都收到了，于是 Ack 回 6 。

所以，快速重传的工作方式是当收到三个相同的 ACK 报文时，会在定时器过期之前，重传丢失的报文段。<br />快速重传机制只解决了一个问题，就是超时时间的问题，但是它依然面临着另外一个问题。就是**重传的时候，是重传之前的一个，还是重传所有的问题。于是便有了**`**SACK**`**方法。**
<a name="RJ3Ik"></a>
#### SACK（Selective Acknowledgment 选择性确认）
这种方式需要在 TCP 头部「选项」字段里加一个 SACK 的东西，它**可以将缓存的地图发送给发送方**，这样发送方就可以知道哪些数据收到了，哪些数据没收到，知道了这些信息，就可以**只重传丢失的数据**。<br />如下图，发送方收到了三次同样的 ACK 确认报文，于是就会触发快速重发机制，通过 SACK 信息发现只有 200~299 这段数据丢失，则重发时，就只选择了这个 TCP 段进行重复。![截屏2022-03-04 上午12.50.49.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646326253889-3bef3a78-74ca-46a9-9f20-7cd30cf6e68b.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u97eeeea8&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-04%20%E4%B8%8A%E5%8D%8812.50.49.png&originHeight=730&originWidth=1314&originalType=binary&ratio=1&rotation=0&showTitle=false&size=391597&status=done&style=none&taskId=u201d9c4e-f59b-440f-af7b-24cb5ab2b4a&title=)

<a name="tU2nJ"></a>
#### D-SACK （Duplicate SACK ）
其主要**使用了 SACK 来告诉「发送方」有哪些数据被重复接收了。**<br />**ACK丢包**![截屏2022-03-04 上午1.11.31.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646327498656-b5d77784-5b0d-40ef-9e4a-bccb30a0b159.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u5a8206f7&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-04%20%E4%B8%8A%E5%8D%881.11.31.png&originHeight=854&originWidth=1296&originalType=binary&ratio=1&rotation=0&showTitle=false&size=415890&status=done&style=none&taskId=u262c5da2-c90f-4d32-ae35-10c4511a5a0&title=)

- 「接收方」发给「发送方」的两个 ACK 确认应答都丢失了，所以发送方超时后，重传第一个数据包（3000 ~ 3499）
- **于是「接收方」发现数据是重复收到的，于是回了一个 SACK = 3000~3500**，告诉「发送方」 3000~3500 的数据早已被接收了，因为 ACK 都到了 4000 了，已经意味着 4000 之前的所有数据都已收到，所以这个 SACK 就代表着 D-SACK。
- 这样「发送方」就知道了，数据没有丢，是「接收方」的 ACK 确认报文丢了。

**网络延时**<br />![截屏2022-03-04 上午1.11.48.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646327513109-ba5840c3-5f66-4543-a957-221740aa2de7.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u0fe4169c&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-04%20%E4%B8%8A%E5%8D%881.11.48.png&originHeight=1350&originWidth=1344&originalType=binary&ratio=1&rotation=0&showTitle=false&size=783851&status=done&style=none&taskId=udb51a065-7da7-4bad-9ce8-d195c077856&title=)

- 数据包（1000~1499） 被网络延迟了，导致「发送方」没有收到 Ack 1500 的确认报文。
- 而后面报文到达的三个相同的 ACK 确认报文，就触发了快速重传机制，但是在重传后，被延迟的数据包（1000~1499）又到了「接收方」；
- **所以「接收方」回了一个 SACK=1000~1500，因为 ACK 已经到了 3000，所以这个 SACK 是 D-SACK，表示收到了重复的包。**
- 这样发送方就知道快速重传触发的原因不是发出去的包丢了，也不是因为回应的 ACK 包丢了，而是因为网络延迟了。
<a name="Wif2S"></a>
### 滑动窗口
从之前的学习我们可以知道，TCP是每发送一个数据，就要进行一次确认应答，就是当上一个数据包收到了并且应答了，才可以发送下一个，这个模式就比如我们在聊天，你说完一句要等我回答你，你才可以说下一句，这样效率是很低的。引入`滑动窗口`就解决了这个问题。TCP连接的两端都各自维护了一个`发送窗口结构`和`接收窗口结构`，这两个窗口结构限制了数据的发送。
<a name="hs8DZ"></a>
##### 发送方窗口
![截屏2022-03-04 上午10.09.18.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646359761926-aac66198-a8b7-4d45-8737-f72cb132c523.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=uaddefa67&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-04%20%E4%B8%8A%E5%8D%8810.09.18.png&originHeight=818&originWidth=1308&originalType=binary&ratio=1&rotation=0&showTitle=false&size=457238&status=done&style=none&taskId=uf611c97c-59c1-4851-bc81-1412b126f0b&title=)

- 已经发送并确认的报文段：发送给接收方后，接收方回回复 ACK 来对报文段进行响应，图中标注绿色的报文段就是已经经过接收方确认的报文段。
- 已经发送但是还没确认的报文段：图中绿色区域是经过接收方确认的报文段，而浅蓝色这段区域指的是已经发送但是还未经过接收方确认的报文段。
- 等待发送的报文段：图中深蓝色区域是等待发送的报文段，它属于发送窗口结构的一部分，也就是说，发送窗口结构其实是由已发送未确认 + 等待发送的报文段构成。
- 窗口滑动时才能发送的报文段：如果图中的 [4,9] 这个集合内的报文段发送完毕后，整个滑动窗口会向右移动，图中橙色区域就是窗口右移时才能发送的报文段。

每个 TCP 报文段都包含**ACK 号和窗口通告信息**，所以每当收到响应时，TCP 接收方都会根据这两个参数调整窗口结构。<br />![截屏2022-03-04 上午10.54.07.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646362452593-77ad4985-79dd-4351-88b8-74f63ea295d4.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=uf1e12611&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-04%20%E4%B8%8A%E5%8D%8810.54.07.png&originHeight=1460&originWidth=1342&originalType=binary&ratio=1&rotation=0&showTitle=false&size=630030&status=done&style=none&taskId=u24247a61-6489-44ae-8c6b-72530eecf5d&title=)<br />当左右边界重合时，此时发送发不会再传输任何数据，这种情况被称为`零窗口`，此时TCP发送发会发起`窗口探测`等待合适的时机再发送数据。
<a name="UehIo"></a>
##### 零窗口
TCP 是通过接收端的窗口通告信息来实现流量控制的。通告窗口告诉了 TCP ，接收端能够接收的数据量。当接收方的窗口变为 0 时，可以有效的阻止发送端继续发送数据。当接收端重新获得可用空间时，它会给发送端传输一个`窗口更新` 告知自己能够接收数据了。`窗口更新`一般是纯 ACK ，即不带任何数据。但是纯 ACK 不能保证一定会到达发送端，于是需要有相关的措施能够处理这种丢包。<br />如果纯 ACK 丢失的话，通信双方就会一直处于等待状态，发送方心想拉垮的接收端怎么还让我发送数据！接收端心想天杀的发送方怎么还不发数据！为了防止这种情况，发送方会采用一个**持续计时器**来间歇性的查询接收方，看看其窗口是否已经增长。持续计时器会触发`窗口探测`，强制要求接收方返回带有更新窗口的 ACK。<br />窗口探测包含一个字节的数据，采用的是 TCP 丢失重传的方式。当 TCP 持续计时器超时后，就会触发窗口探测的发送。一个字节的数据能否被接收端接收，还要取决于其缓冲区的大小。
<a name="R390m"></a>
### 拥塞控制
**在网络出现拥堵时，如果继续发送大量数据包，可能会导致数据包时延、丢失等，这时 TCP 就会重传数据，但是一重传就会导致网络的负担更重，于是会导致更大的延迟以及更多的丢包，这个情况就会进入恶性循环被不断地放大….**<br />所以，TCP 不能忽略网络上发生的事，它被设计成一个无私的协议，当网络发送拥塞时，TCP 会自我牺牲，降低发送的数据量。<br />于是，就有了**拥塞控制**，控制的目的就是**避免「发送方」的数据填满整个网络。**
<a name="SgOiL"></a>
##### 拥塞窗口
**拥塞窗口 cwnd** 是发送方维护的一个 的状态变量，它会根据**网络的拥塞程度动态变化的**。<br />我们在前面提到过发送窗口 swnd 和接收窗口 rwnd 是约等于的关系，那么由于入了拥塞窗口的概念后，此时发送窗口的值是 swnd = min(cwnd, rwnd)，也就是拥塞窗口和接收窗口中的最小值。<br />拥塞窗口 cwnd 变化的规则：

- 只要网络中没有出现拥塞，cwnd 就会增大；
- 但网络中出现了拥塞，cwnd 就减少；

而判断拥塞，其实只要「发送方」没有在规定时间内接收到 ACK 应答报文，也就是**发生了超时重传，就会认为网络出现了拥塞。**
<a name="YdEvQ"></a>
##### TCP的拥塞控制主要是以下四种方式
<a name="VgQpr"></a>
#### 慢启动
TCP 在刚建立连接完成后，首先是有个慢启动的过程，这个慢启动的意思就是一点一点的提高发送数据包的数量，如果一上来就发大量的数据，这不是给网络添堵吗？<br />慢启动的算法记住一个规则就行：`当发送方每收到一个 ACK`，就拥塞窗口 cwnd 的大小就会加 1。
<a name="ZtOlY"></a>
##### 慢启动门限 ssthresh （slow start threshold）

- 当cwnd < ssthresh 时，使用`慢启动算法`
- 当cwnd >= ssthresh 时，使用`拥塞避免算法`![截屏2022-03-04 下午3.16.48.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646378217940-992da976-ef36-4772-b3a2-0f2bc3e8bbc1.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=ub081195e&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-04%20%E4%B8%8B%E5%8D%883.16.48.png&originHeight=904&originWidth=1312&originalType=binary&ratio=1&rotation=0&showTitle=false&size=210727&status=done&style=none&taskId=u0f06f83c-41a6-4a65-a3df-536509338e4&title=)
<a name="TtH2N"></a>
#### 拥塞避免
当 cwnd >= ssthresh 时，就会进入`拥塞避免算法`<br />**拥塞避免算法**：每当收到一个ACK时，cwnd 增加 1 / cwnd，也就是说，cwnd每次只会增加1。<br />![截屏2022-03-04 下午3.19.49.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646378395648-ed5bef75-c9ca-4c54-83b3-3175404f613c.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=ufe0edca2&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-04%20%E4%B8%8B%E5%8D%883.19.49.png&originHeight=1150&originWidth=1300&originalType=binary&ratio=1&rotation=0&showTitle=false&size=201658&status=done&style=none&taskId=ub24b0722-ea71-4b11-9c45-725c528367f&title=)<br />也就说，拥塞避免算法就是将原本慢启动算法中的cwnd指数增长变成了线性增长，总体还是处于增长阶段，但是增长速度缓慢了一些。但如果就这么一直增长下去，网络就肯定会慢慢进入到拥塞的状态了，于是就会出现丢包的情况，这时就需要对丢失的数据包进行重传了。这个时候就是`拥塞发生阶段`了，于是便有了`**拥塞发生算法**`**。**
<a name="v1UrL"></a>
#### 拥塞发生
当网络出现拥塞，有丢包的情况发生了，就会发生数据包重传，重传机制主要有两种

- 超时重传
- 快速重传
<a name="lt8o2"></a>
##### 超时重传导致的拥塞发生算法
超时引发的拥塞发生算法，会导致`ssthresh`和`cwnd`的值发生变化：<br />`ssthresh` 设为 原本 `cwnd 的 二分之一`<br />`cwnd` 重置为 1，然后重新开始慢启动<br />**缺点：这种方法过于激进，一旦发生超时重传，cwnd 直接置为 1，反应也会很强烈，很容易造成网络卡顿。**
<a name="hNWz2"></a>
#### ![截屏2022-03-04 下午3.36.46.png](https://cdn.nlark.com/yuque/0/2022/png/1645656/1646379410591-45a1112b-daa5-4217-8437-5dd348448117.png#clientId=ud04e769f-65b5-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=ub2bf4211&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-03-04%20%E4%B8%8B%E5%8D%883.36.46.png&originHeight=1082&originWidth=1308&originalType=binary&ratio=1&rotation=0&showTitle=false&size=276166&status=done&style=none&taskId=u3d803b80-b749-45c3-a4fe-742fc6d234c&title=)
<a name="ehCjk"></a>
##### 快速重传导致的拥塞发生算法
当接收方发现丢了一个中间包的时候，发送三次前一个包的 ACK，于是发送端就会快速地重传，不必等待超时再重传。TCP会认为这种情况不严重，因为只是丢了一小部分，`ssthresh`和`cwnd`的变化不会很大。

- `cwnd = cwnd / 2`
- `ssthresh = cwnd`
- 然后进入快速恢复算法
<a name="TVhpi"></a>
#### 快速恢复
快速重传和快速恢复算法一般同时使用，因为快速恢复算法是认为，你还能收到 3 个重复 ACK 说明网络也不那么糟糕。在快速重传阶段，`ssthresh 和 cwnd`已经被更新了。快速恢复的做法是：

- `cwnd = ssthresh + 3`（）
- 重传丢失的数据包对应的seq
- 如果再收到该重复Ack，则cwnd++，线性增长（缓慢调整）
- 如果收到了新Ack，则cwnd = ssthresh ，然后就进入了拥塞避免的算法了

<Vssue :title="$title" :issue-id="7"/>




