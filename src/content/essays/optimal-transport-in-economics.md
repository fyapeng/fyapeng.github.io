---
title: "经济学中的最优运输：从配置、对偶到分布几何"
date: "2026-07-17"
summary: "一篇面向经济学读者的系统导论：从 Monge–Kantorovich 问题、对偶势与循环单调性出发，进入 Brenier 映射、Wasserstein 几何、Sinkhorn 算法，并讨论匹配、离散选择、计量经济学、空间与公共服务配置中的用途和识别边界。"
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

> 最优运输不是“求两个分布之间距离”的同义词。它首先是一套配置理论：边际分布规定两侧各有什么，耦合决定谁与谁相遇，成本或剩余表达技术与偏好，对偶势给出支持该配置的价格，而 Wasserstein 几何才是在这一结构之上形成的分布空间。

最优运输理论研究一个看似朴素、实际上极具穿透力的问题：给定两个分布，怎样把第一个分布中的质量重新配置为第二个分布，并使总成本最低？这里的“质量”可以是土方、商品或人口，也可以是劳动者、企业、患者、医院、消费者、产品、收入状态、风险类型与后验信念。成本可以表示空间距离、迁移摩擦、生产错配、医疗风险、效用损失或制度约束。

这套理论之所以进入经济学核心工具箱，原因在于大量经济问题具有共同结构：研究者已知两侧主体的边际分布，需要确定它们之间的联合配置；或者观察到联合配置，希望反推出偏好、技术和影子价格；或者需要比较两个完整分布，并构造具有经济含义的反事实路径。最优运输把这些问题统一为“边际—耦合—成本—对偶”的数学体系。

本文从历史、数学结构、经济学应用、计算方法与学习路径五个层面介绍最优运输。重点不是罗列术语，而是解释一条贯穿始终的主线：

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

读者最好具备线性代数、概率论、微积分和基本优化知识。测度论、凸分析与线性规划会在关键位置出现，本文保留必要的技术细节，也会明确区分数学上的最优性、经济学中的均衡解释与经验研究中的因果识别。

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

1781年，法国数学家Gaspard Monge研究挖土区与填土区之间的最小搬运成本。设源空间为 $X$，目标空间为 $Y$，源质量分布为 $\mu$，目标质量分布为 $\nu$，单位质量从 $x$ 运到 $y$ 的成本为 $c(x,y)$。Monge寻找一个映射

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

推前约束表示：源分布经过映射 $T$ 后恰好形成目标分布。每一个源点 $x$ 只有一个目的地 $T(x)$，因而Monge方案属于确定性配置。

这个表述非常自然，同时带来两个困难。第一，满足推前约束的映射可能不存在。一个原子质量若必须拆分到多个目标点，确定性映射无法完成任务。第二，映射集合通常缺少凸性和良好的闭性，极限过程容易离开可行集。

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

$\pi(dx,dy)$描述从源状态 $x$ 流向目标状态 $y$ 的联合质量。它允许一个源点的质量分散到多个目标点，因而可行集成为凸集。在线性成本下，目标函数对 $\pi$ 也是线性的。最优运输由此进入线性规划、凸分析和概率论的共同领域。

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

“耦合”是最优运输最核心的概率语言。边际分布只告诉我们两侧各自的组成，耦合进一步说明谁与谁配置。给定相同边际，可以形成正向排序、反向排序、独立配置及大量中间结构。经济问题经常真正关心这个联合结构。

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

对偶的重要性远远超过“换一种方式计算最优值”。它提供三类信息。

第一类是最优性证书。若可行计划 $\pi$ 与可行势函数 $(\varphi,\psi)$ 满足

$$
\varphi(x)+\psi(y)=c(x,y)
$$

在 $\pi$ 的支撑上成立，则原始值与对偶值相等，$\pi$ 已经最优。

第二类是价格解释。在匹配模型中，对偶势可以表示两侧主体的均衡收益；在空间模型中，它们可以表示地租、可达性势或区位价值；在公共资源配置中，它们可以表示容量的影子价格。

第三类是敏感性分析。边际分布发生微小变化时，对偶势给出最优值的一阶变化方向。某一类患者增加、某一地区需求上升或某一医院容量扩张，都会通过相应势函数反映其边际社会价值。

### 2. 互补松弛与接触集合

定义接触集合

$$
\Gamma_{\varphi,\psi}
=
\{(x,y):\varphi(x)+\psi(y)=c(x,y)\}.
$$

最优计划的质量集中在接触集合上。对偶不等式对所有潜在配置成立，等式则筛选真正发生的配置。经济学语言中，所有未匹配组合都满足无阻挡条件，实际匹配组合恰好耗尽剩余。

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

含义十分清楚：把一组既有匹配的目标对象循环交换，无法降低总成本。循环单调性是局部无改进条件的全局版本，也连接显露偏好、机制可实施性和逆最优运输。

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

分位数方法因此可以理解为一维最优运输。分位数处理效应、分布分解、changes-in-changes等计量方法都与单调运输具有紧密联系。因果解释需要额外的秩不变、秩相似、条件独立或结构单调假设；运输映射本身给出分布间的规范对应关系。

一维排序也解释了经济学中的正向选配。若剩余函数 $s(x,y)$ 具有增加差异，等价于

$$
\frac{\partial^2 s(x,y)}{\partial x\partial y}>0,
$$

高类型劳动者与高类型企业的共单调匹配最大化总剩余。若交叉偏导为负，反向排序获得更高剩余。

---

## 四、高维情形：Brenier映射与凸几何

高维空间缺少自然全序，分位数映射无法直接照搬。二次成本提供了一个规范替代。

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

Brenier定理给出高维二次运输的核心结论：若源分布 $\mu$ 对Lebesgue测度绝对连续，存在凸函数 $u$，使

$$
T(x)=\nabla u(x)
$$

把 $\mu$ 推到 $\nu$，并诱导唯一的二次成本最优计划。

凸梯度映射承担了高维单调重排的角色。其图像具有循环单调性，凸势函数为高维排序提供一个坐标无关的规范。该结构进入多维分位数、匹配模型、生成Jacobian方程以及Monge–Ampère偏微分方程。

若源密度为 $f$，目标密度为 $g$，映射足够光滑且可逆，则质量守恒给出

$$
f(x)=g(\nabla u(x))\det D^2u(x).
$$

这就是Monge–Ampère方程。运输理论由此连接凸分析、非线性偏微分方程和几何测度论。

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

协方差部分形成Bures–Wasserstein几何，在统计学、金融风险、协方差矩阵估计和高斯近似中具有独立价值。

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

在具有有限 $p$ 阶矩的概率测度空间上，$W_p$ 构成真正的距离。它同时比较质量位置与移动代价，因而对分布支撑的几何位置具有敏感性。

### 1. 与常见分布距离的区别

总变差距离关注同一点上的概率质量差异。KL散度关注密度比并具有方向性。Wasserstein距离允许质量跨空间移动，距离结构直接进入比较。

考虑两个Dirac测度 $\delta_x$ 与 $\delta_y$。当 $x\ne y$ 时，总变差距离达到最大值；Wasserstein距离等于 $d(x,y)$，能够区分“相距很近”与“相距很远”。这一性质使其适合空间分布、图像、点云、收入分布和地理配置。

### 2. 位移插值

若 $T$ 是从 $\mu_0$ 到 $\mu_1$ 的最优映射，定义

$$
T_t(x)=(1-t)x+tT(x),
\qquad
\mu_t=(T_t)_{\#}\mu_0.
$$

$(\mu_t)_{t\in[0,1]}$ 是 $W_2$ 空间中的测地线。普通概率混合

$$
(1-t)\mu_0+t\mu_1
$$

同时保留两端质量；位移插值让每个粒子沿最优路径移动。经济动态中，两种路径代表不同机制：人口在地区间迁移、财富状态连续调整与生产率分布重配更接近位移路径。

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

这一表述奠定Wasserstein梯度流、JKO格式、扩散方程、拥挤模型和连续时间人口配置的基础。

---

## 六、计算革命：从线性规划到Sinkhorn

离散最优运输是具有 $mn$ 个变量的线性规划。精确算法包括网络单纯形、最小费用流和指派算法。高分辨率图像、海量样本和可微机器学习模型会迅速推高计算成本。

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

即Sinkhorn矩阵缩放。Marco Cuturi在2013年把这一经典矩阵缩放方法系统引入现代计算最优运输，使大规模OT进入数据科学和机器学习。论文与代码资料见：[Sinkhorn Distances](https://papers.nips.cc/paper/4927-sinkhorn-distances-lightspeed-computation-of-optimal-transport)。

熵正则化改变了最优计划：$\varepsilon$ 较大时方案更平滑，$\varepsilon$ 较小时接近精确OT。计算中还需要处理数值下溢、对数域稳定化、正则化偏误、样本误差和停止准则。

经济学中，熵项可能具有两种来源。第一种来源是计算平滑，用于提高算法效率；第二种来源是结构性不可观测异质性，例如随机匹配模型中的极值冲击。两者产生相似数学形式，参数解释和反事实含义需要分别建立。

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

$U$与 $V$ 可以解释为两侧均衡收益。稳定配置、社会剩余最大化和最优运输在可转移效用环境中形成同一结构。Chiappori、McCann与Nesheim进一步证明准线性享乐价格均衡、稳定匹配和最优运输之间的等价关系，公开版本见：[Hedonic Price Equilibria, Stable Matching, and Optimal Transport](https://www.math.utoronto.ca/mccann/papers/hedonicLP.pdf)。

### 2. 比较优势与多维排序

一维超模剩余产生正向选配。多维类型中，简单的“高对高”排序失去唯一含义。最优运输通过循环单调性、twist条件和凸势函数刻画配置结构。

若

$$
s(x,y)=x^\top Ay,
$$

矩阵 $A$ 决定不同技能与技术维度之间的互补性。观察匹配数据可以反推 $A$ 或更一般的剩余函数，这构成逆最优运输和结构匹配估计。

### 3. 随机匹配与结构估计

现实匹配包含未观测偏好与摩擦。若随机效用服从适当极值结构，社会剩余最大化问题会出现熵正则项。Galichon与Salanié的匹配模型利用这一结构，从观察到的匹配频率识别系统剩余并进行反事实分析。

最优运输在这里同时承担三个角色：均衡求解、对偶收益恢复与结构参数识别。识别仍依赖归一化、支持条件、排除限制和随机效用分布假设。

---

## 八、经济学应用二：享乐价格、离散选择与产业组织

### 1. 享乐市场

消费者类型为 $x$，产品特征为 $z$，生产者类型为 $y$。消费者效用与生产成本共同决定均衡产品配置。准线性条件下，享乐价格函数可视为连接两侧对偶势的中介对象。其梯度或次梯度刻画产品特征如何响应消费者偏好和生产者技术。

最优运输提供：

- 均衡配置的存在性；
- 价格势函数的凸性或广义凸性；
- 纯匹配与聚集的结构条件；
- 类型分布变化的比较静态；
- 从价格和配置数据恢复偏好、技术的识别框架。

### 2. 离散选择的质量运输表述

随机效用模型中，消费者的效用冲击向量具有给定分布，观察到的选择概率是最优选择区域的质量。选择概率、社会剩余函数和凸共轭之间存在紧密关系。

在若干离散选择识别问题中，研究者可把效用冲击分布与选择结果分布之间的关系写成运输或指派问题。对偶变量对应系统效用，循环单调性形成可检验限制。该视角也进入随机系数需求模型和BLP计算。

### 3. 逆最优运输

正向OT给定成本 $c$ 求解配置 $\pi$。逆OT观察 $\pi$，寻找能够支持该配置的成本、剩余或势函数。

逆问题通常缺乏唯一性。若把

$$
c(x,y)
$$

替换为

$$
c(x,y)+a(x)+b(y),
$$

所有固定边际计划的相对排序保持不变。因此，成本只能在边际加性项之外被识别。经验研究还需要参数化、正则化、工具变量或额外市场变化。

---

## 九、经济学应用三：多维分位数与计量经济学

一维分位数把均匀秩 $U$ 映射到结果 $Y$。高维结果缺少自然分位数顺序。Brenier映射提供规范定义：选定绝对连续参考分布 $\mu$，寻找凸梯度映射

$$
Q(u)=\nabla\phi(u)
$$

使

$$
Q_{\#}\mu=\nu.
$$

$Q$ 被解释为向量分位数，逆映射被解释为向量秩。Chernozhukov、Galichon、Hallin与Henry据此建立Monge–Kantorovich深度、分位数、秩和符号，论文见：[Monge–Kantorovich Depth, Quantiles, Ranks and Signs](https://projecteuclid.org/journals/annals-of-statistics/volume-45/issue-1/MongeKantorovich-depth-quantiles-ranks-and-signs/10.1214/16-AOS1450.pdf)。

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

这种最小距离方法保留整个分布的信息。其统计性质受到维数、尾部、正则性和模型模拟误差影响。高维经验Wasserstein距离通常面临维数灾难，结构化运输、平滑、投影和熵正则化可改善具体问题中的表现。

---

## 十、经济学应用四：空间配置、公共服务与卫生经济学

### 1. 空间均衡

居民、企业与土地位置之间的配置包含通勤成本、地租、生产率和便利度。半离散OT中，一侧为连续人口分布，另一侧为有限城市、学校或设施。对偶势决定Laguerre单元或加权Voronoi区域，每个区域的质量满足容量要求。

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

该模型可评估地理可及性、集中治疗、医院容量和患者异质性之间的效率前沿。其经验可信度取决于 $M(x,h)$ 是否具有潜在结果含义、容量数据是否准确、患者选择和医院选择性收治是否被处理。OT负责在给定对象下寻找最优配置；因果识别负责确定成本矩阵和福利对象。

### 3. 公平约束

纯粹总成本最小化可能把出行负担集中在偏远地区或弱势群体。公平可以直接写入约束：

$$
\mathbb E[D(X,H)\mid G=g]\le \bar D_g,
$$

或者要求不同群体的健康改善不低于给定水平。对偶乘子给出公平约束的社会机会成本。最优运输因而适合展示效率—公平前沿，并明确每项约束的影子价格。

---

## 十一、最优运输能回答什么

最优运输的优势集中在以下问题：

1. **配置问题**：谁应与谁匹配，质量应流向哪里；
2. **分布变换**：一个分布如何以最低成本转化为另一个分布；
3. **均衡价格**：哪些势函数或收益支持最优配置；
4. **比较静态**：边际、容量和成本变化如何影响价值与配置；
5. **结构反推**：观察配置能够恢复哪些偏好、技术和摩擦；
6. **分布几何**：如何定义分布间距离、测地线和重心；
7. **多维排序**：怎样把分位数、秩与单调性推广到高维。

经验研究还需要单独回答：

- 成本函数来源于行为、技术还是研究者设定；
- 观察配置属于市场均衡、行政规则还是历史路径；
- 未观察反事实结果如何识别；
- 社会福利权重如何确定；
- 容量、价格和选择集是否内生；
- 运输映射的结构条件是否与经济机制一致。

一个计算正确的最优计划只说明给定模型下的优化结果。经济解释的可信度来自模型设定、识别策略、数据质量和稳健性分析的共同支持。

---

## 十二、现代扩展

经典OT固定两个边际，并对点对成本积分。现代研究通过修改成本、边际或信息约束形成多个分支。

### 1. 非平衡最优运输

允许质量创造、消失或边际偏离，并用KL散度等函数惩罚。它适合人口流失、市场进入退出、缺失质量和样本总量不同的场景。

### 2. 多边际最优运输

同时耦合三个或更多分布。应用包括多期匹配、风险聚合、Wasserstein重心、团队形成和多侧市场。

### 3. 鞅最优运输

在耦合上加入

$$
\mathbb E[Y\mid X]=X
$$

等鞅约束，连接凸序、稳健金融定价和信息扩散。

### 4. 弱最优运输

成本可依赖条件分布 $\pi(dy\mid x)$，例如

$$
C(x,\pi_x).
$$

这使模型能够表达风险、条件均值、随机控制和更一般的行为反应。

### 5. 适应性与因果运输

时间序列环境要求运输计划尊重信息到达顺序和非预见性约束。该框架连接随机过程比较、动态决策与因果结构。

### 6. 信息设计

贝叶斯说服中的状态边际由先验固定，后验或行动分布内生形成，服从条件引入额外矩约束。部分非线性说服问题可以写成广义生产性运输。OT的对偶、接触集合和twist思想为最优信号结构提供新的求解工具。

### 7. Gromov–Wasserstein与结构比较

经典Wasserstein距离要求两个分布位于同一个带距离的空间中。若对象来自不同空间，点与点之间没有可直接比较的坐标，但各自空间内部的关系仍有意义，可以比较成对距离结构。Gromov–Wasserstein问题通过耦合两侧质量，使空间内部距离的扭曲最小。它适合网络、图、不同特征维度的数据集与结构保持匹配，但计算和统计问题通常比经典OT更困难。

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

最优运输提供了一种高度统一的经济学语言。边际分布描述市场两侧或政策前后的总体组成，耦合描述微观配置，成本与剩余承载行为和技术，对偶势给出价格与影子价值，循环单调性刻画可实施性，Wasserstein几何描述分布变化的路径，计算算法把理论转化为可处理的数据问题。

这套理论的真正门槛在于同时掌握四个层面：概率分布的测度语言、优化问题的原始—对偶结构、最优映射的凸几何、经济模型的识别与均衡解释。完成这四层连接后，最优运输会从一个“分布距离公式”转化为研究匹配、配置、分布和信息的一般方法。
