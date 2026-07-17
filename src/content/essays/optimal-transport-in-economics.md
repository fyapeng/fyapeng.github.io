---
title: "经济学中的最优运输理论"
date: "2026-07-17"
summary: "从 Monge–Kantorovich 问题讲到对偶势、Brenier 映射、Wasserstein 几何和 Sinkhorn 算法，并讨论匹配、离散选择、计量经济学及公共服务配置中的具体用法与识别条件。"
category: "方法笔记"
tags: ["最优运输", "匹配模型", "Wasserstein 距离", "凸分析", "计量经济学"]
cover: "/images/essays/optimal-transport-in-economics.jpg"
coverAlt: "贝鲁特达希耶街区的居民在无人机袭击期间仰望天空并在建筑物外避难"
coverCaption: "《Drone Attacks in Beirut》，摄于 2024 年 9 月 29 日。"
coverCredit: "Murat Şengül / Anadolu Agency / World Press Photo"
coverCreditUrl: "https://www.worldpressphoto.org/collection/photo-contest/2025/Murat-Sengul/1"
wechatUrl: ""
draft: false
---

> 给定两侧各自的分布，怎样安排它们之间的对应关系？经济学中的匹配、分工、区位选择、公共服务分配和分布反事实，经常可以从这个问题开始。

1781年，Monge讨论挖土区与填土区之间的搬运。两个多世纪以后，问题中的“土方”已经换成劳动者、企业、患者、医院、消费者、产品、收入状态和后验信念；搬运成本也可以写成通勤时间、生产错配、医疗风险、效用损失或制度摩擦。形式始终相近：源分布和目标分布给定，研究者在所有可行的联合配置中寻找成本最低的一项。

经济学关心的往往正是边际分布没有透露的信息。劳动者类型分布和职位类型分布并不能告诉我们谁进入哪家企业；患者构成和医院容量也不能决定患者如何分流。联合分布补上了这部分配置结构。成本函数把技术、偏好和约束带入问题，对偶变量则记录支持最优配置所需的收益或影子价格。

以下各节沿着同一组对象展开：

$$
\text{边际分布}
\longrightarrow
\text{可行耦合}
\longrightarrow
\text{成本最小化}
\longleftrightarrow
\text{对偶价格}
\longrightarrow
\text{配置与反事实}.
$$

文章从有限运输表出发，随后讨论连续分布、对偶、凸势、Wasserstein几何和计算方法，最后回到匹配、离散选择、计量与公共服务配置。阅读所需的基础包括线性代数、概率论、微积分和基本优化。涉及测度论或凸分析时，正文保留结论成立所需的条件。数学最优性、市场均衡和因果识别分属不同层次，应用部分会分别说明。

全文可以按四层来读：

| 层次 | 核心对象 | 要回答的问题 |
|---|---|---|
| 配置 | 映射 $T$、耦合 $\pi$ | 给定两侧边际，谁应当配置给谁？ |
| 价格 | 对偶势 $\varphi,\psi$ | 什么价格或收益能够支持这一配置？ |
| 几何 | $W_p$、测地线、梯度流 | 两个完整分布相距多远，怎样连续变化？ |
| 经验 | 成本、剩余、容量与约束 | 数学对象如何由行为、技术和识别条件赋予经济含义？ |

---

## 一、从土方搬运到概率分布配置

### 1. Monge的土方问题

设源空间为 $X$，目标空间为 $Y$，源质量分布为 $\mu$，目标质量分布为 $\nu$，单位质量从 $x$ 运到 $y$ 的成本为 $c(x,y)$。Monge把运输方案写成映射

$$
T:X\to Y
$$

满足推前约束

$$
T_{\#}\mu=\nu,
$$

并最小化

$$
\inf_{T_{\#}\mu=\nu}
\int_X c(x,T(x))\,d\mu(x).
$$

推前约束要求 $T$ 将 $\mu$ 变成 $\nu$。每个源点 $x$ 只有一个目的地 $T(x)$，所以质量不能在目标点之间拆分。若一个原子必须分给多个目的地，可行映射便不存在。即使映射存在，可行映射的集合通常也不具备凸性和良好的闭性，直接证明最优解存在并不容易。

Monge的原始论文可在法国国家图书馆的历史资料中查到：[Mémoire sur la théorie des déblais et des remblais](https://gallica.bnf.fr/ark:/12148/bpt6k1082250/f660.item)。

### 2. Kantorovich松弛

20世纪40年代，Leonid Kantorovich把决策对象从运输映射扩展为联合分布或运输计划。一个运输计划

$$
\pi\in\Pi(\mu,\nu)
$$

是定义在 $X\times Y$ 上的概率测度，其第一边际为 $\mu$，第二边际为 $\nu$。Kantorovich问题写成

$$
\inf_{\pi\in\Pi(\mu,\nu)}
\int_{X\times Y} c(x,y)\,d\pi(x,y).
$$

$\pi(dx,dy)$记录从 $x$ 配置到 $y$ 的质量。质量可以拆分，可行集 $\Pi(\mu,\nu)$ 因而是凸的；目标函数对 $\pi$ 线性。Monge问题中的映射优化经过这一松弛，转成了测度空间上的线性规划。

Kantorovich在资源配置、线性规划和最优运输方面的贡献获得1975年诺贝尔经济学奖。诺贝尔委员会的官方介绍见：[Leonid Vitaliyevich Kantorovich – Facts](https://www.nobelprize.org/prizes/economic-sciences/1975/kantorovich/facts/)。

### 3. 从运输表到耦合

有限情形最容易展示问题结构。设源分布为

$$
a=(a_1,\ldots,a_m),
$$

目标分布为

$$
b=(b_1,\ldots,b_n),
$$

运输计划是非负矩阵 $\pi=(\pi_{ij})$，满足

$$
\sum_j\pi_{ij}=a_i,
\qquad
\sum_i\pi_{ij}=b_j.
$$

给定成本矩阵 $C=(C_{ij})$，原问题为

$$
\min_{\pi\ge 0}
\sum_{i=1}^m\sum_{j=1}^n C_{ij}\pi_{ij}.
$$

在经济学中，$i$可以表示劳动者类型，$j$可以表示企业类型；$a_i$与$b_j$给出两侧人口，$\pi_{ij}$给出实际匹配量。若 $S_{ij}$ 是匹配剩余，令 $C_{ij}=-S_{ij}$，成本最小化便转换为社会剩余最大化。

概率论把具有指定边际的联合分布称为耦合。相同的两个边际可以对应正向排序、反向排序、独立配置以及大量中间情形。成本函数在这些耦合之间排序。对匹配模型而言，这一步决定总剩余；对反事实分解而言，它决定如何把一个分布中的个体状态与另一个分布对应起来。

---

## 二、对偶：价格、势函数与最优性证书

### 1. Kantorovich对偶

有限运输问题的对偶为

$$
\max_{u,v}
\left\{
\sum_i a_i u_i+\sum_j b_jv_j
:\ u_i+v_j\le C_{ij}
\right\}.
$$

连续版本为

$$
\sup_{\varphi,\psi}
\left\{
\int_X\varphi\,d\mu+
\int_Y\psi\,d\nu
:\ \varphi(x)+\psi(y)\le c(x,y)
\right\}.
$$

$\varphi$与 $\psi$ 称为Kantorovich势函数。强对偶在适当条件下给出

$$
\inf_{\pi\in\Pi(\mu,\nu)}\int c\,d\pi
=
\sup_{\varphi+\psi\le c}
\left(
\int\varphi\,d\mu+
\int\psi\,d\nu
\right).
$$

对偶把运输计划上的优化改写为两个边际上的势函数。若可行计划 $\pi$ 与可行势函数 $(\varphi,\psi)$ 满足

$$
\varphi(x)+\psi(y)=c(x,y)
$$

在 $\pi$ 的支撑上成立，原始值与对偶值便相等。这给出一张可核验的最优性证书。

势函数还有直接的经济解释。匹配模型用它表示两侧主体的均衡收益；空间模型将其解释为地租、可达性或区位价值；容量约束下的公共资源配置会产生相应的影子价格。边际分布发生小幅变化时，势函数也给出最优值的一阶变化。例如，某类患者增加或某家医院扩容的边际社会价值，可以从相应对偶变量读取。

### 2. 互补松弛与接触集合

定义接触集合

$$
\Gamma_{\varphi,\psi}
=
\{(x,y):\varphi(x)+\psi(y)=c(x,y)\}.
$$

最优计划只在接触集合上配置质量。对偶不等式约束所有潜在组合，等式标出实际采用的组合。可转移效用匹配中的稳定性条件具有同样结构：未匹配组合无法通过偏离创造更高联合收益，已匹配组合恰好分完其剩余。

以可转移效用匹配为例，设剩余为 $s(x,y)$，双方收益为 $U(x)$ 与 $V(y)$。稳定性条件为

$$
U(x)+V(y)\ge s(x,y),
$$

实际匹配满足

$$
U(x)+V(y)=s(x,y).
$$

令 $c=-s$ 并调整符号，这正是Kantorovich对偶和互补松弛。

### 3. 循环单调性

对偶接触集合具有更深的几何结构。一个集合 $\Gamma\subset X\times Y$ 称为 $c$-循环单调，若任取有限个点 $(x_i,y_i)\in\Gamma$，均有

$$
\sum_{i=1}^N c(x_i,y_i)
\le
\sum_{i=1}^N c(x_i,y_{i+1}),
\qquad y_{N+1}=y_1.
$$

这项条件检验一组配置能否通过循环交换降低成本。它把两两比较扩展到任意有限循环，也为显露偏好、机制可实施性和逆最优运输提供了可操作的限制。

---

## 三、一维情形：分位数就是最优运输

一维最优运输具有闭式结构。设 $F_\mu,F_\nu$ 为分布函数，广义分位数为

$$
Q_\mu(u)=\inf\{x:F_\mu(x)\ge u\},
\qquad u\in(0,1).
$$

令 $U\sim\mathrm{Unif}(0,1)$，则

$$
X=Q_\mu(U),\qquad Y=Q_\nu(U)
$$

构成共单调耦合。对 $c(x,y)=|x-y|^p$，$p\ge1$，这一耦合最优，并给出

$$
W_p^p(\mu,\nu)
=
\int_0^1|Q_\mu(u)-Q_\nu(u)|^p\,du.
$$

当 $\mu$ 无原子时，最优映射为

$$
T(x)=Q_\nu(F_\mu(x)).
$$

同一个均匀秩 $U$ 同时生成 $X$ 和 $Y$，因此共单调耦合把相同分位的人配在一起。分位数处理效应、分布分解和 changes-in-changes 都可借助这一表示理解。运输映射本身只规定两个边际之间的对应方式；把它解释为个体反事实，还要加入秩不变、秩相似、条件独立或结构单调等假设。

一维匹配中的排序结论也可以直接由运输问题得到。若剩余函数 $s(x,y)$ 具有增加差异，即

$$
\frac{\partial^2 s(x,y)}{\partial x\partial y}>0,
$$

重排不等式意味着共单调匹配最大化总剩余，高类型劳动者与高类型企业相互匹配。交叉偏导为负时，最优排序方向相反。

---

## 四、高维情形：Brenier映射与凸几何

高维类型没有统一的“高低”顺序，逐维排序又依赖坐标选择。二次成本下的凸梯度映射给出一种坐标一致的推广。

设

$$
c(x,y)=\frac12\|x-y\|^2.
$$

成本可展开为

$$
\frac12\|x-y\|^2
=
\frac12\|x\|^2+
\frac12\|y\|^2-x\cdot y.
$$

固定边际后，最小化平方距离等价于最大化相关内积 $\mathbb E[X\cdot Y]$。进一步定义

$$
u(x)=\frac12\|x\|^2-\varphi(x),
$$

Kantorovich对偶约束可转化为Fenchel–Young不等式

$$
u(x)+u^*(y)\ge x\cdot y.
$$

等号成立当且仅当

$$
y\in\partial u(x).
$$

Brenier定理说明：若源分布 $\mu$ 对Lebesgue测度绝对连续，存在凸函数 $u$，使

$$
T(x)=\nabla u(x)
$$

把 $\mu$ 推到 $\nu$，并诱导唯一的二次成本最优计划。

凸梯度的图像具有循环单调性，这项几何约束替代了一维中的单调递增。多维分位数、连续类型匹配和 Monge–Ampère 方程都建立在这一表示上。

若源密度为 $f$，目标密度为 $g$，映射足够光滑且可逆，则质量守恒给出

$$
f(x)=g(\nabla u(x))\det D^2u(x).
$$

这个 Jacobian 方程即 Monge–Ampère 方程。凸势的存在性、正则性和边界行为由此成为运输映射研究的主要分析问题。

### 高斯分布的闭式结果

设

$$
\mu=\mathcal N(m_0,\Sigma_0),
\qquad
\nu=\mathcal N(m_1,\Sigma_1).
$$

非退化情形下，Brenier映射为仿射函数

$$
T(x)=m_1+A(x-m_0),
$$

其中

$$
A=
\Sigma_0^{-1/2}
\left(
\Sigma_0^{1/2}\Sigma_1\Sigma_0^{1/2}
\right)^{1/2}
\Sigma_0^{-1/2}.
$$

相应距离为

$$
W_2^2(\mu,\nu)
=
\|m_0-m_1\|^2
+
\operatorname{tr}\left[
\Sigma_0+
\Sigma_1-
2\left(
\Sigma_0^{1/2}\Sigma_1\Sigma_0^{1/2}
\right)^{1/2}
\right].
$$

公式把均值移动和协方差变形分开。后一项对应 Bures–Wasserstein 几何，常用于比较协方差矩阵、构造高斯近似和处理金融风险分布。

---

## 五、Wasserstein距离：分布空间中的几何

当成本取 $d(x,y)^p$ 时，定义

$$
W_p(\mu,\nu)
=
\left[
\inf_{\pi\in\Pi(\mu,\nu)}
\int d(x,y)^p\,d\pi(x,y)
\right]^{1/p}.
$$

在有限 $p$ 阶矩的概率测度空间上，$W_p$ 满足距离公理。它按移动距离计算质量重配的代价，分布支撑在底层空间中的位置会直接影响数值。

### 1. 与常见分布距离的区别

总变差距离比较同一点上的概率质量，KL 散度比较密度比且具有方向性。Wasserstein 距离允许质量在空间中移动，并把移动距离计入损失。

例如，只要 $x\ne y$，两个 Dirac 测度 $\delta_x$ 与 $\delta_y$ 的总变差距离就达到最大值；它们的 Wasserstein 距离为 $d(x,y)$。后者保留了“移动多远”的信息，因而适合空间分布、图像、点云、收入分布和地理配置。

### 2. 位移插值

若 $T$ 是从 $\mu_0$ 到 $\mu_1$ 的最优映射，定义

$$
T_t(x)=(1-t)x+tT(x),
\qquad
\mu_t=(T_t)_{\#}\mu_0.
$$

$(\mu_t)_{t\in[0,1]}$ 是 $W_2$ 空间中的测地线。它与普通概率混合

$$
(1-t)\mu_0+t\mu_1
$$

含义不同。概率混合在中间时点同时保留两端的质量，位移插值则让质量沿运输路径移动。人口迁移、财富状态调整和生产率分布重配通常更适合用后一种路径描述。

### 3. 动态表述

Benamou–Brenier公式把静态运输改写为流体动力学问题：

$$
W_2^2(\mu_0,\mu_1)
=
\inf_{\rho_t,v_t}
\int_0^1\int\|v_t(x)\|^2\rho_t(x)\,dx\,dt,
$$

约束为连续性方程

$$
\partial_t\rho_t+
\nabla\cdot(\rho_t v_t)=0.
$$

连续性方程保证质量守恒，目标函数累计整条路径上的动能。Wasserstein 梯度流和 JKO 离散化把扩散方程、拥挤模型与连续时间配置问题写进了这一动态框架。

---

## 六、计算革命：从线性规划到Sinkhorn

离散运输表含有 $mn$ 个未知数。网络单纯形、最小费用流和指派算法可以求精确解，但变量数随两侧支持点数量的乘积增长。高分辨率图像、大样本和可微模型很快会遇到计算瓶颈。

熵正则化引入

$$
\min_{\pi\in\Pi(a,b)}
\langle C,\pi\rangle
+
\varepsilon
\sum_{i,j}\pi_{ij}(\log\pi_{ij}-1).
$$

最优解具有对角缩放形式

$$
\pi_\varepsilon
=
\operatorname{diag}(u)
K
\operatorname{diag}(v),
\qquad
K_{ij}=e^{-C_{ij}/\varepsilon}.
$$

边际约束给出迭代

$$
u\leftarrow a\oslash(Kv),
\qquad
v\leftarrow b\oslash(K^\top u),
$$

这就是 Sinkhorn 矩阵缩放。Cuturi（2013）将它用于大规模计算最优运输，矩阵乘法和并行硬件随后显著扩展了 OT 在数据科学中的可用规模。论文见：[Sinkhorn Distances](https://papers.nips.cc/paper/4927-sinkhorn-distances-lightspeed-computation-of-optimal-transport)。

正则参数 $\varepsilon$ 控制计算速度、平滑程度和对原问题的近似误差。较大的 $\varepsilon$ 产生更分散的运输计划；$\varepsilon$ 向零时，解逐渐接近未正则化 OT。实际实现还要处理指数核的数值下溢、对数域稳定化、停止准则以及样本误差。

经济模型中的熵项有时只是算法正则化，有时来自随机效用或不可观测异质性。两种写法在数学上相近，参数含义却不同。前一种 $\varepsilon$ 由计算权衡选择，后一种尺度参数属于行为模型，改变它会改变结构反事实。

---

## 七、经济学应用一：匹配、分工与错配

### 1. 可转移效用匹配

设劳动者类型分布为 $\mu$，企业类型分布为 $\nu$，匹配剩余为 $s(x,y)$。社会规划者求解

$$
\sup_{\pi\in\Pi(\mu,\nu)}
\int s(x,y)\,d\pi(x,y).
$$

对偶为

$$
\inf_{U,V}
\left
\{
\int U(x)\,d\mu+
\int V(y)\,d\nu
:\ U(x)+V(y)\ge s(x,y)
\right\}.
$$

$U$ 与 $V$ 分别表示两侧主体的均衡收益。约束要求任何潜在组合的联合收益都不低于其可创造的剩余；实际匹配上约束取等号。在可转移效用环境中，稳定性与社会剩余最大化由原始—对偶问题连接。准线性享乐价格均衡也可纳入这一结构，参见 Chiappori、McCann 与 Nesheim 的 [Hedonic Price Equilibria, Stable Matching, and Optimal Transport](https://www.math.utoronto.ca/mccann/papers/hedonicLP.pdf)。

### 2. 比较优势与多维排序

一维超模剩余产生正向选配。类型进入多维以后，“高类型”不再有唯一排序。循环单调性、twist 条件和凸势函数可以继续约束匹配图像，并在适当条件下保证纯匹配和映射唯一性。

若

$$
s(x,y)=x^\top Ay,
$$

矩阵 $A$ 编码技能维度与技术维度之间的互补关系。多个市场中的匹配频率及边际分布变化，可以用来估计 $A$ 或更一般的剩余函数。识别范围取决于归一化、支持变化和模型对未观测偏好的处理。

### 3. 随机匹配与结构估计

现实匹配含有研究者看不到的偏好与摩擦。适当的极值型随机效用会在社会规划问题中生成熵项。Galichon 与 Salanié 利用这一结构，从匹配频率恢复系统剩余，再求解类型分布或偏好变化下的反事实。运输算法负责均衡计算，对偶变量用于恢复收益；结构参数能识别到什么程度，仍由归一化、支持、排除限制和随机效用分布决定。

---

## 八、经济学应用二：享乐价格、离散选择与产业组织

### 1. 享乐市场

消费者类型为 $x$，产品特征为 $z$，生产者类型为 $y$。消费者效用与生产成本共同决定均衡产品配置。准线性条件下，享乐价格函数可视为连接两侧对偶势的中介对象。其梯度或次梯度刻画产品特征如何响应消费者偏好和生产者技术。

这一表述可以处理：

- 均衡配置的存在性；
- 价格势函数的凸性或广义凸性；
- 纯匹配与聚集的结构条件；
- 类型分布变化的比较静态；
- 从价格和配置数据恢复偏好、技术的识别框架。

### 2. 离散选择的质量运输表述

随机效用模型把消费者的效用冲击向量看作一个给定分布。每种产品对应冲击空间中的一个最优选择区域，区域质量就是选择概率。社会剩余函数及其凸共轭把系统效用、选择概率与冲击分布联系起来。

据此，一些离散选择识别问题可以写成冲击分布与离散选择结果之间的运输。对偶变量对应系统效用，循环单调性产生可检验的矩不等式。随机系数需求模型的求解也能利用同类凸优化结构。

### 3. 逆最优运输

逆最优运输从观测配置 $\pi$ 出发，寻找能够支持它的成本、剩余或势函数。正向问题中的最优性条件在这里变成识别限制。

逆问题通常缺乏唯一性。若把

$$
c(x,y)
$$

替换为

$$
c(x,y)+a(x)+b(y),
$$

所有固定边际计划的相对排序保持不变，所以单个市场无法区分这些边际加性项。参数化、正则化、工具变量和跨市场边际变化各自提供额外限制；若不说明限制来源，恢复出的“成本”只是一组观测等价表示中的一个。

---

## 九、经济学应用三：多维分位数与计量经济学

一维分位数把均匀秩 $U$ 映射到结果 $Y$。向量结果没有天然的全序。选定一个绝对连续参考分布 $\mu$ 后，可以用 Brenier 映射定义

$$
Q(u)=\nabla\phi(u)
$$

使

$$
Q_{\#}\mu=\nu.
$$

$Q$ 是向量分位数，逆映射给出向量秩。参考分布的选择属于定义的一部分；不同参考几何会产生不同的秩坐标。相关统计理论见 Chernozhukov、Galichon、Hallin 与 Henry 的 [Monge–Kantorovich Depth, Quantiles, Ranks and Signs](https://projecteuclid.org/journals/annals-of-statistics/volume-45/issue-1/MongeKantorovich-depth-quantiles-ranks-and-signs/10.1214/16-AOS1450.pdf)。

条件向量分位数和向量分位数回归进一步要求

$$
Y=Q(U,Z),
$$

其中 $U$ 服从固定参考分布，并满足相应的独立或均值独立条件。相关研究见：[Vector Quantile Regression: An Optimal Transport Approach](https://arxiv.org/abs/1406.4643)。

最优运输也可用作结构估计准则：选择参数 $\theta$，使模型分布 $\mu_\theta$ 与数据分布 $\widehat\mu$ 的Wasserstein距离最小：

$$
\widehat\theta
=
\arg\min_\theta
W_p(\widehat\mu,\mu_\theta).
$$

这一准则使用完整经验分布，而非有限个矩。代价是经验 Wasserstein 距离在高维中收敛较慢，对尾部和模拟误差也较敏感。投影 Wasserstein、切片距离、结构化成本和平滑正则化可以降低计算或统计难度，但同时改变了估计准则。

---

## 十、经济学应用四：空间配置、公共服务与卫生经济学

### 1. 空间均衡

居民、企业与土地位置之间的配置同时受通勤成本、地租、生产率和便利度影响。半离散 OT 将连续人口分配给有限个城市、学校或设施。设施一侧的对偶势决定 Laguerre 单元，也就是带权 Voronoi 区域；调整这些权重，可以让每个区域恰好容纳指定质量。

这类结构适用于：

- 学区和服务区划分；
- 城市设施布局；
- 住宅—岗位空间匹配；
- 贸易流和市场区；
- 灾后人口安置；
- 气候迁移与土地利用。

### 2. 患者—医院配置

设患者类型为 $x$，医院为 $h$，预测健康损失、医疗成本和出行成本合成为

$$
c(x,h)
=
\omega_m M(x,h)
+
\omega_c C(x,h)
+
\omega_d D(x,h).
$$

给定医院容量 $K_h$，规划者可以求解

$$
\min_\pi
\sum_h\int c(x,h)\,d\pi_h(x)
$$

并施加

$$
\sum_h\pi_h=\mu,
\qquad
\pi_h(X)\le K_h.
$$

该模型给出地理可及性、集中治疗和医院容量之间的配置比较。计算结果的经验含义取决于 $M(x,h)$ 是否对应可信的潜在健康结果，成本和容量是否测量准确，以及患者选择和医院选择性收治如何处理。运输算法只接受给定的成本矩阵和福利权重；这些对象需要由因果设计、结构模型或明确的规范判断提供。

### 3. 公平约束

总成本最小的方案可能把较长出行或较差健康结果集中在某些地区和群体。可以对群体平均负担直接施加约束：

$$
\mathbb E[D(X,H)\mid G=g]\le \bar D_g,
$$

也可以规定各群体的最低健康改善。约束的对偶乘子衡量进一步收紧公平标准所需放弃的总效率，由此可以绘制效率—公平前沿。前沿本身不决定哪一点最合意，选择仍取决于社会福利权重。

---

## 十一、最优运输能回答什么

当两侧边际给定而联合配置未知时，OT直接回答谁与谁匹配、质量流向哪里。对偶势同时给出支持配置的收益或影子价格。改变人口构成、设施容量或成本参数后，重新求解原始—对偶问题，还可以做配置比较静态。

把运输方向反过来，观测到的匹配和流量能够约束潜在的偏好、技术与摩擦。把底层成本设为距离的幂，运输值又成为分布间的度量，并进一步定义测地线、重心和高维秩。这几类用途共享同一套数学对象，识别要求却各不相同。

经验应用需要交代成本函数的来源、观测配置的形成机制、未观测反事实的识别方法，以及容量、价格和选择集的内生性。带有社会福利含义的研究还要说明群体权重。算法求出的最优计划只对输入的成本、边际和约束负责；模型设定决定它能否解释为市场均衡或政策反事实。

---

## 十二、现代扩展

经典 OT 固定两个边际，目标函数对点对成本积分。放松边际约束、增加条件矩或改变成本的作用对象，会得到若干常用扩展。

### 1. 非平衡最优运输

非平衡 OT 允许质量创造、消失或偏离给定边际，并用 KL 散度等函数处罚偏离。人口流失、市场进入退出、缺失质量和样本总量不同都可以这样表示。

### 2. 多边际最优运输

多边际 OT 同时耦合三个或更多分布，可用于多期匹配、风险聚合、Wasserstein 重心、团队形成和多侧市场。变量数量随边际数迅速增长，模型结构往往决定计算是否可行。

### 3. 鞅最优运输

在耦合上加入

$$
\mathbb E[Y\mid X]=X
$$

等鞅约束。它要求给定当前状态后的未来状态保持相同条件均值，因而连接凸序、无套利下的稳健金融定价和信息扩散。

### 4. 弱最优运输

成本可依赖条件分布 $\pi(dy\mid x)$，例如

$$
C(x,\pi_x).
$$

条件分布本身进入成本后，规划者可以评价风险、条件均值和分散程度。随机控制与带分布偏好的行为模型常采用这种形式。

### 5. 适应性与因果运输

时间序列中的耦合还要尊重信息到达顺序。适应性运输对条件分布施加非预见性约束，使两个随机过程的比较与动态决策所使用的信息集一致。

### 6. 信息设计

贝叶斯说服固定状态先验，由信号设计诱导后验和行动分布；Bayes plausibility 表现为额外的矩约束。一部分非线性说服问题可以写成广义运输，对偶和接触集合随后用于刻画最优信号支持。

### 7. Gromov–Wasserstein与结构比较

经典 Wasserstein 距离要求两个分布位于同一个带距离的空间。若对象来自不同空间，点之间缺少可直接比较的坐标，空间内部的成对距离仍可比较。Gromov–Wasserstein 问题寻找使内部距离扭曲最小的耦合，适用于网络、图和特征维度不同的数据集。它的目标函数通常不再是线性的，计算与统计难度也高于经典 OT。

---

## 十三、学习路线

### 第一阶段：有限运输、线性规划与对偶

先掌握：

- 运输表和耦合；
- 运输多面体；
- 线性规划强对偶；
- 互补松弛；
- 指派与最小费用流；
- 一维单调重排。

这一阶段可以直接使用有限矩阵做手算和Python实验。读者应能够从成本矩阵构造原始计划、对偶势和最优性证书。

### 第二阶段：经典连续理论

需要补足：

- Borel概率测度和弱收敛；
- 紧性与下半连续性；
- Monge与Kantorovich问题；
- 最优计划存在性；
- Kantorovich对偶；
- $c$-循环单调性；
- twist条件与最优映射；
- Brenier定理。

### 第三阶段：Wasserstein几何和计算

学习：

- $W_p$度量和收敛；
- 位移插值；
- Benamou–Brenier动态公式；
- 梯度流与JKO格式；
- 熵正则化和Sinkhorn；
- 重心、非平衡OT和Gromov–Wasserstein。

### 第四阶段：按研究方向进入专题

经济理论重点阅读匹配、享乐价格、逆OT与信息设计；计量研究重点阅读向量分位数、统计OT和结构估计；城市与公共经济学重点阅读半离散OT、容量约束和拥挤模型；动态研究重点阅读梯度流、鞅OT和适应性OT。

---

## 十四、参考书目

### 1. 经济学主线

1. **Alfred Galichon, _Optimal Transport Methods in Economics_**  
   经济学读者最直接的入口，涵盖线性规划、匹配、享乐模型、离散选择与计量应用。作者主页提供介绍、代码和课程资料：  
   <https://alfredgalichon.com/book-otme/>

2. **Alfred Galichon, “The Unreasonable Effectiveness of Optimal Transport in Economics”**  
   篇幅较短的经济学应用地图，覆盖匹配、分位数、离散选择和贸易：  
   <https://arxiv.org/abs/2107.04700>

3. **Alfred Galichon and Marc Henry, “An Econometrician’s Guide to Optimal Transport”**  
   2026年预印本，按计量应用依赖的数学结构组织文献，适合作为前沿导航：  
   <https://arxiv.org/abs/2604.04227>

### 2. 数学理论

4. **Filippo Santambrogio, _Optimal Transport for Applied Mathematicians_**  
   变分法、PDE、建模和完整证明之间的平衡较好。作者公开版本：  
   <https://math.univ-lyon1.fr/~santambrogio/OTAM-cvgmt.pdf>

5. **Cédric Villani, _Topics in Optimal Transportation_**  
   经典理论、二次成本、Brenier映射和Monge–Ampère的重要参考。

6. **Cédric Villani, _Optimal Transport: Old and New_**  
   范围广、一般性强，适合完成第一轮基础学习后作为高级参考。公开讲义版本可见：  
   <https://www.ceremade.dauphine.fr/~mischler/articles/VBook-O%26N.pdf>

7. **Luigi Ambrosio and Nicola Gigli, “A User’s Guide to Optimal Transport”**  
   从经典OT进入Wasserstein几何、梯度流和度量测度空间：  
   <https://cvgmt.sns.it/media/doc/paper/195/users_guide-final.pdf>

### 3. 计算与统计

8. **Gabriel Peyré and Marco Cuturi, _Computational Optimal Transport_**  
   现代计算OT的标准资料，含熵正则化、Sinkhorn、重心和多种扩展：  
   <https://optimaltransport.github.io/book/>

9. **Sinho Chewi, Jonathan Niles-Weed and Philippe Rigollet, _Statistical Optimal Transport_**  
   集中讨论经验OT、统计误差、维数灾难、映射估计和统计应用：  
   <https://arxiv.org/abs/2407.18163>

### 4. 经济学与计量代表论文

10. **Pierre-André Chiappori, Robert McCann and Lars Nesheim, “Hedonic Price Equilibria, Stable Matching, and Optimal Transport”**  
    <https://www.math.utoronto.ca/mccann/papers/hedonicLP.pdf>

11. **Victor Chernozhukov, Alfred Galichon, Marc Hallin and Marc Henry, “Monge–Kantorovich Depth, Quantiles, Ranks and Signs”**  
    <https://projecteuclid.org/journals/annals-of-statistics/volume-45/issue-1/MongeKantorovich-depth-quantiles-ranks-and-signs/10.1214/16-AOS1450.pdf>

12. **Guillaume Carlier, Victor Chernozhukov and Alfred Galichon, “Vector Quantile Regression: An Optimal Transport Approach”**  
    <https://arxiv.org/abs/1406.4643>

13. **Marco Cuturi, “Sinkhorn Distances: Lightspeed Computation of Optimal Transportation Distances”**  
    <https://papers.nips.cc/paper/4927-sinkhorn-distances-lightspeed-computation-of-optimal-transport>

---

## 结语

最优运输把几个常被分开处理的对象放在同一个问题中：边际分布给出两侧构成，耦合记录微观配置，成本或剩余表达经济环境，对偶势记录收益和影子价值。循环单调性约束哪些配置能够由某个成本函数支持，Wasserstein 距离和测地线则把同一优化问题用于比较完整分布。

掌握公式之后，应用仍有三项困难：选定合适的成本，证明运输解与行为或均衡一致，说明反事实所需的识别条件。缺少其中任何一项，计算结果都可能只有数学含义。三项条件同时满足，OT才能用于可信的匹配、配置与分布分析。
