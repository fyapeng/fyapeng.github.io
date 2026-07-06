---
title: "异质性 DID 的误差从哪里来"
date: "2026-07-07"
summary: "从双向固定效应回归的隐含权重出发，解释交错处理、动态事件研究、非二元处理、协变量与多个处理变量为什么会带来负权重、禁止对比和动态污染，并梳理现代 DID 方法如何重新定义估计对象、控制组与聚合权重。"
category: "方法笔记"
tags: ["DID", "TWFE", "异质性处理效应", "负权重", "事件研究", "Stacked DID"]
cover: "/images/essays/heterogeneous-did-weights.jpg"
coverAlt: "烟雾中的街道人群和执法人员，作为复杂政策冲击与混杂对比的隐喻图像"
wechatUrl: ""
draft: false
---

> 这篇笔记关心的不是 DID 是否仍然有用，而是当处理时间、处理强度、处理持续期和处理效应都存在异质性时，传统双向固定效应回归到底在估计什么。很多争论表面上是“负权重”问题，实质上是估计对象、控制组和比较权重没有被清楚定义。

双重差分最容易让人误解的地方在于，它看起来太像一个普通回归。只要把处理变量、个体固定效应和时间固定效应放进同一个方程，就似乎可以得到一个政策效应：

$$
Y_{it}=\alpha_i+\lambda_t+\beta D_{it}+\varepsilon_{it}.
$$

在 2×2 的经典 DID 中，这个写法并没有什么问题。只有两个组、两个时期，一个组在处理后接受政策，另一个组始终未处理。此时，双向固定效应回归只是经典双重差分估计量的回归表达。只要未处理潜在结果满足平行趋势假设，$\beta$ 就可以解释为处理组在处理后的平均处理效应。

问题出现在更一般的面板数据中。现实中的政策通常不是在同一个时间、以同一个强度、对所有处理组同时发生。地方试点会逐步推广，医保支付改革会分批落地，最低工资调整会在不同地区、不同时间发生，处理强度也可能并非简单的 0/1。研究者还常常在回归中加入时变控制变量，或者同时面对多个政策冲击。此时，传统的双向固定效应回归仍然可以被估计出来，但它估计的东西未必还是研究者以为的那个平均处理效应。

这篇文章想回答几个具体问题：当处理效应存在异质性时，TWFE 回归系数到底在加权什么？为什么会出现负权重、禁止的对比和动态污染？Callaway-Sant'Anna、Sun-Abraham、Borusyak-Jaravel-Spiess、Gardner 的 did2s、de Chaisemartin-D'Haultfœuille，以及 Cengiz 等人的 stacked DID，究竟是在解决什么问题？更重要的是，未来我们在做 DID 时，为什么不应再把传统 TWFE 作为复杂交错处理设计下的唯一基准结果？

## 一、从“无伤大雅”到模型误设

经验研究中常见的一个想法是：即使处理效应存在异质性，常系数回归也许仍然能估计某种平均处理效应。这个想法在某些情形下是成立的。比如在条件独立假设下，如果研究者对离散控制变量做饱和控制，常系数回归的处理变量系数可以写成一组异质处理效应的加权平均，且权重非负、加总为 1。此时，虽然常系数模型没有刻画所有异质性，但它仍然可以被理解为某种有意义的平均效应。这个意义上的模型简化，可以说是“无伤大雅”的。

但 DID 的复杂之处在于，平行趋势假设并不自动保证 TWFE 回归系数仍然是异质处理效应的凸组合。林梦芸、徐阳、郭汝飞、易君健（2025）把这个问题概括为“模型误设”的统一框架：研究者实际估计的是常系数 TWFE 模型，但真实的数据生成过程可能更接近允许处理效应随组别、时间、处理持续期或处理强度变化的饱和模型。常系数模型相对于异质效应模型遗漏了关键交互项，而遗漏项又与残差化后的处理变量相关，于是回归系数就不再有简单的平均处理效应解释。

可以把问题抽象为两类模型。第一类是研究者常用的常系数模型：

$$
Y_{gt}=\alpha_g+\lambda_t+\beta D_{gt}+u_{gt}.
$$

它假设所有处理效应都可以被一个共同的 $\beta$ 概括。第二类是更一般的异质效应模型：

$$
Y_{gt}
=
\alpha_g+\lambda_t
+
\sum_{(g,t)\in\Omega}
\beta_{gt} I_{gt}D_{gt}
+
e_{gt},
$$

其中 $\beta_{gt}$ 允许处理效应随组别 $g$ 和时间 $t$ 改变。这里的 $I_{gt}$ 是组别—时间单元的指示变量。只要现实中不同地区、不同 cohort、不同处理持续时间的效应可能不同，这个模型就比常系数模型更接近真实世界。

常系数 TWFE 的问题可以理解为：它用一个 $\beta$ 强行概括一组 $\beta_{gt}$。这本身未必有害；如果 $\beta$ 是一组 $\beta_{gt}$ 的非负加权平均，且权重和为 1，那么它仍然可以解释为某种平均处理效应。但 DID 的关键问题在于，在交错处理、动态模型、非二元处理变量和协变量误设下，TWFE 回归中的 $\beta$ 往往不是异质处理效应的凸组合，而是一个权重可能为负、对比对象可能错误、解释对象不透明的线性组合。

## 二、TWFE 到底在加权什么

为了看清这一点，可以从最基本的 TWFE 静态模型开始。假设数据被聚合到组别—时间层面，组别为 $g$，时期为 $t$，每个单元的样本量为 $N_{gt}$。处理变量是吸收型二元处理，即某组一旦接受处理，此后一直处于处理状态：

$$
D_{gt}=1\{t\geq G_g\},
$$

其中 $G_g$ 是组 $g$ 首次接受处理的时间。常系数 TWFE 回归为：

$$
Y_{gt}=\alpha_g+\lambda_t+\beta D_{gt}+u_{gt}.
$$

根据 Frisch-Waugh-Lovell 定理，$\beta$ 可以通过残差化后的处理变量来表达。把 $D_{gt}$ 对组固定效应和时间固定效应回归，得到残差：

$$
\widetilde D_{gt}
=
D_{gt}
-\bar D_{g\cdot}
-\bar D_{\cdot t}
+\bar D.
$$

在样本量加权的情形下，相应均值也应使用样本量加权均值。由 FWL 定理可得：

$$
\beta^{TWFE}
=
\frac{
\sum_{g,t}N_{gt}\widetilde D_{gt}Y_{gt}
}{
\sum_{g,t}N_{gt}\widetilde D_{gt}^{2}
}.
$$

接下来把结果变量写成潜在结果形式：

$$
Y_{gt}=Y_{gt}(0)+D_{gt}\tau_{gt},
$$

其中 $\tau_{gt}$ 是组 $g$ 在时间 $t$ 的处理效应。代入上式，可以得到：

$$
\beta^{TWFE}
=
\frac{
\sum_{g,t}N_{gt}\widetilde D_{gt}Y_{gt}(0)
}{
\sum_{g,t}N_{gt}\widetilde D_{gt}^{2}
}
+
\frac{
\sum_{g,t}N_{gt}\widetilde D_{gt}D_{gt}\tau_{gt}
}{
\sum_{g,t}N_{gt}\widetilde D_{gt}^{2}
}.
$$

在平行趋势以及固定效应模型正确刻画未处理潜在结果的条件下，第一项的总体对应物为零。于是，TWFE 回归系数可以写成所有已经接受处理的组别—时间处理效应的线性组合：

$$
\beta^{TWFE}
=
\sum_{(g,t)\in\Omega_1}
\omega_{gt}\tau_{gt},
$$

其中 $\Omega_1=\{(g,t):D_{gt}=1\}$，即所有已经受处理的组别—时间单元。权重为：

$$
\omega_{gt}
=
\frac{
N_{gt}\widetilde D_{gt}
}{
\sum_{(g,t)\in\Omega_1}N_{gt}\widetilde D_{gt}
}.
$$

这个公式是理解异质性 DID 的入口。它告诉我们，TWFE 并不是按样本量简单平均各个 $ATT(g,t)$，而是按照残差化后的处理变量 $\widetilde D_{gt}$ 加权。只要某些已经处理的单元满足 $\widetilde D_{gt}<0$，对应的处理效应就会被赋予负权重。此时，一个处理效应越大，反而可能把总体回归系数往相反方向拉。极端情况下，即使所有真实处理效应都为正，TWFE 估计出的 $\beta$ 也可能为负。

为什么 $\widetilde D_{gt}$ 会是负的？直觉上，$\widetilde D_{gt}$ 衡量的是某个 cell 的处理状态相对于它所在组别平均、所在时期平均和总体平均的“异常程度”。如果一个组很早就处理，那么它的组内平均处理概率很高；如果某个时期很多组都已经处理，那么该时期平均处理概率也很高。对早处理组的较晚时期而言，虽然 $D_{gt}=1$，但相对于“这个组一直很像处理组”和“这个时期很多组都已处理”的背景，它的残差化处理状态可能反而是负的。负权重不是抽象的代数小问题，而是说明回归正在把一些已经处理的观察值放到不合适的位置上。

所以，“负权重”只是表象。更深层的问题是：TWFE 在交错处理设计中自动构造了一些不应当出现的比较，尤其是把已经处理、且处理效应可能随时间变化的组拿来作为其他组的控制组。

## 三、禁止的对比与动态污染

在 2×2 经典 DID 中，控制组始终未处理。因此平行趋势假设只需要约束未处理潜在结果 $Y(0)$ 的变化趋势。在交错处理设计中，情况发生了变化。较早接受处理的组在较晚时期已经处于处理状态，但 TWFE 回归可能仍然把它拿来作为较晚接受处理组的控制组。此时比较的对象不再是“处理组相对未处理组的变化”，而可能变成“晚处理组相对早已处理组的变化”。

考虑一个最简单的 2×3 设计。组 1 在第 2 期接受处理，组 2 在第 3 期接受处理：

| 组别 | t=1 | t=2 | t=3 |
|---|---:|---:|---:|
| g=1 | 0 | 1 | 1 |
| g=2 | 0 | 0 | 1 |

这个设计可以拆成两个 2×2 DID。第一个使用 $t=1,2$，组 1 是处理组，组 2 尚未处理，是干净控制组。只要平行趋势成立，这个 DID 可以识别 $ATT(1,2)$。第二个使用 $t=2,3$，组 2 是新处理组，而组 1 在两个时期都已经处理。因为组 1 的处理状态在这两个时期没有变化，TWFE 会把它视作控制组。但这个比较并不干净。根据潜在结果展开，第二个 DID 等于：

$$
DID_2
=
ATT(2,3)+ATT(1,2)-ATT(1,3).
$$

这里 $ATT(1,3)$ 以负号进入。也就是说，早处理组在第 3 期的处理效应越大，第二个 DID 反而越小。只有当早处理组的处理效应不随时间变化，即 $ATT(1,2)=ATT(1,3)$ 时，第二个 DID 才能识别 $ATT(2,3)$。但这相当于额外要求处理效应在处理后不发生动态变化。对于大多数政策来说，这个假设很难被认为天然成立。

Goodman-Bacon 的分解把 staggered TWFE 写成许多 2×2 DID 的加权平均。这个分解的直觉意义是：TWFE 看似只估计了一个 $\beta$，实际上混合了早处理组对晚处理组、晚处理组对早处理组、处理组对从未处理组、处理组对始终处理组等多种比较。问题不只是这些比较的权重大小，而是其中一些比较本身已经偏离了 DID 的反事实逻辑。所谓“禁止的对比”，指的就是把已经受处理、且处理效应可能随时间变化的组当作控制组。

动态事件研究中的问题更进一步。常见写法是：

$$
Y_{it}
=
\alpha_i+\lambda_t+
\sum_{\ell\neq -1}
\mu_\ell 1\{t-G_i=\ell\}
+
\varepsilon_{it}.
$$

其中 $G_i$ 是个体或组首次接受处理的时间，$\ell=t-G_i$ 是相对处理时间，$\ell=-1$ 通常作为基准期。研究者希望把 $\mu_\ell$ 解释为处理后第 $\ell$ 期的动态效应，或者在 $\ell<0$ 时用它检验事前趋势。

然而，在交错处理和处理效应异质的情形下，这个解释并不稳固。Sun 和 Abraham（2021）指出，传统 TWFE event-study 中某一个相对时期的系数，可能混入其他相对时期的处理效应。形式上，某个 $\ell$ 期系数可以写成：

$$
\mu_\ell^{TWFE}
=
\sum_{\ell'}
\sum_e
w^{\ell}_{e,\ell'}
\tau_{e,\ell'}.
$$

这里 $e$ 表示 cohort，$\ell'$ 表示真实的相对时期。理想情况下，$\mu_\ell$ 应该只平均 $\tau_{e,\ell}$，也就是所有 cohort 在相对时期 $\ell$ 的处理效应。但在传统 TWFE event-study 中，$\ell'\neq\ell$ 的处理效应也可能进入 $\mu_\ell$。这就产生了动态污染。

动态污染带来两个严重后果。第一，处理后某一期的估计系数不再只代表这一期的效应，而可能混入更早或更晚的处理效应。第二，处理前的 lead 系数也可能不再是单纯的事前趋势检验。即使没有真正的预期效应，处理后异质效应也可能通过 TWFE 的权重结构污染处理前的系数，让研究者误以为存在事前趋势。反过来，如果真实事前趋势存在，传统 event-study 的低检验功效也可能无法识别。

因此，事件研究图不是天然可靠的平行趋势检验。若这张图来自传统 TWFE lead/lag 回归，在交错处理和异质效应下，它本身就可能是被污染的对象。现代动态 DID 方法的一个核心任务，就是让每个相对时期的估计系数尽可能只对应那个时期的处理效应。

## 四、非二元处理、协变量与多个政策

很多政策并非简单的 0/1 处理。最低工资的 bite、进口关税下降幅度、环保政策强度、医保支付改革覆盖强度、金融管制放松指数，都可以是连续或多值离散处理变量。研究者常常写：

$$
Y_{gt}=\alpha_g+\lambda_t+\beta D_{gt}+u_{gt},
$$

并将 $\beta$ 解释为处理强度每增加一单位对结果变量的影响。这个解释隐含很强的假设：单位处理强度的效应是线性的、同质的，并且低强度组可以作为高强度组的合理控制组。若这些假设不成立，非二元处理下的 TWFE 也会产生类似的模型误设。

设处理强度 $d$ 的处理效应允许随组别和时间变化，异质效应模型可写成：

$$
Y_{gt}
=
\alpha_g+\lambda_t+
\sum_{(g,t)}
\sum_d
\beta^d_{gt}I^d_{gt}1\{D_{gt}>0\}
+
e_{gt}.
$$

常系数 TWFE 中的 $\beta$ 可以分解为：

$$
\beta
=
\sum_{(g,t)}
\sum_d
\omega^d_{gt}\beta^d_{gt},
$$

其中权重的一般形式为：

$$
\omega^d_{gt}
=
\frac{
N^d_{gt}\widetilde D_{gt}
}{
\sum_{(g,t)\in\Omega_2}
N_{gt}D_{gt}\widetilde D_{gt}1\{D_{gt}>0\}
}.
$$

由于 $\widetilde D_{gt}$ 仍然可能为负，非二元处理变量同样会产生负权重。更直观地说，TWFE 会把处理强度较低的组拿来作为处理强度较高组的控制组。但低强度组并不是未处理组，它也已经受到政策影响。除非单位处理强度效应在不同组和不同时间完全可比，否则这种比较不再是干净的反事实比较。

一个双组双期例子即可看出。两组在第 2 期都受到处理，但强度不同，且 $d_m>d_l>0$：

| 组别 | t=1 | t=2 |
|---|---:|---:|
| g=m | 0 | $d_m$ |
| g=l | 0 | $d_l$ |

若潜在结果满足：

$$
E[Y^d_{gt}]=Y^0_{gt}+\delta_g d,
$$

则 DID 差分为：

$$
DID=\delta_m d_m-\delta_l d_l.
$$

如果把低强度组当作控制组，那么低强度组自身的处理效应 $\delta_l d_l$ 会以负号进入估计量。只要 $\delta_l d_l$ 足够大，即使两个组的处理效应方向都为正，估计值也可能为负。这说明连续处理 DID 的困难不只是技术实现，而是估计对象本身需要重新定义。研究者究竟要估计水平效应、斜率效应、平均剂量效应，还是处理轨迹效应？如果这个问题没有被明确，连续处理变量的 TWFE 系数很难有稳定解释。

协变量问题也类似。应用研究者经常在 DID 中加入：

$$
Y_{it}
=
\alpha_i+\lambda_t+\beta D_{it}+X_{it}'\delta+\varepsilon_{it}.
$$

表面上看，控制变量越多，模型越“稳健”。但 DID 中的协变量使用有特殊风险。首先，协变量可能是坏控制。如果某个时变协变量受到政策影响，它就位于政策影响结果的机制链条中。控制它会截断一部分处理效应，让 $\beta$ 不再代表总效应。其次，协变量对结果的影响可能随时间变化。产业结构、财政能力、人口结构、医疗资源等变量，在长期面板中对结果的影响很可能不是常数。如果模型写成 $X_{it}'\delta$，就隐含所有时期的协变量斜率都相同。更合理的做法往往是控制基期协变量与时间虚拟变量的交互项，或者在条件平行趋势框架下使用回归调整、逆概率加权或双重稳健方法。

多个处理变量则更复杂。若存在两个政策变量：

$$
Y_{gt}
=
\alpha_g+\lambda_t+\beta_1D^1_{gt}+\beta_2D^2_{gt}+u_{gt},
$$

研究者可能希望解释 $\beta_1$ 为主政策 $D^1$ 的效应。然而，如果副政策 $D^2$ 的效应本身异质，且 $D^1$ 与 $D^2$ 的变化时间和对象重叠，那么控制 $D^2$ 并不等于解决问题。它可能只是把另一个异质处理变量的误设带进主处理变量的估计中。此时需要明确主处理、共处理和排除样本的规则，或者使用多处理 DID、stacked design、switcher design 等更清楚的研究设计。

## 五、现代 DID 方法到底解决什么

现代 DID 方法并不是简单的“新命令替换旧命令”。它们共同解决的是：在处理效应异质时，如何重新建立清楚的估计对象、干净的控制组和可解释的聚合权重。

第一，估计对象要先定义，而不能由回归自动决定。研究者需要说明要估计的是总体 ATT、cohort-specific ATT、event-time dynamic ATT、处理强度的边际效应，还是某个窗口内的局部效应。以二元交错处理为例，更清楚的基本对象是：

$$
ATT(g,t)
=
E[Y_t(1)-Y_t(0)\mid G=g],
$$

即在 $t$ 时期，首次处理时间为 $g$ 的 cohort 的平均处理效应。总体 ATT 或动态 ATT 应该是这些 $ATT(g,t)$ 的显式聚合，而不是由 TWFE 的残差权重隐式决定。

第二，控制组要干净。对于二元交错处理，常见控制组包括从未处理组、尚未处理组、最后处理组，或者某个 stack 窗口内尚未处理的组。关键是不能把已经处理且处理效应可能随时间变化的组当作控制组。对于非二元处理，控制组应当在处理强度变化上具有明确解释，不能简单把低剂量组当作未处理组。

第三，权重要可解释。现代方法通常先估计局部的、清楚定义的效应，再用样本量、cohort 规模、event-time 可识别性或研究者指定的政策权重聚合。这样做不保证所有识别假设都成立，但至少让估计量在回答什么问题这件事上更诚实。

几类主要方法可以放在同一张图谱中理解：

| 方法 | 基本对象 | 控制组选择 | 解决的核心问题 | 适合场景 |
|---|---|---|---|---|
| TWFE | 一个全局 $\beta$ | 回归自动选择 | 不透明，可能负权重 | 2×2 或近似同质效应 |
| Goodman-Bacon | 2×2 DID 分解 | 诊断不同比较 | 看清 TWFE 权重来源 | 诊断传统 TWFE |
| Callaway-Sant'Anna | $ATT(g,t)$ | never-treated / not-yet-treated | 先估计 group-time ATT，再显式聚合 | 二元交错处理 |
| Sun-Abraham | $ATT(e,\ell)$ | clean cohorts | 修正 event-study 的动态污染 | 动态事件研究 |
| BJS imputation | treated cell effect | 未处理观测估计反事实 $Y(0)$ | 用插补反事实避免禁止对比 | 高效事件研究 |
| did2s | 残差化结果后的处理效应 | 未处理观测估计固定效应 | 回归友好的两阶段 DID | 静态或动态 DID |
| dCDH / did_multiplegt | switcher DID | 状态不变组 | 使用 clean comparisons，允许多次变化 | 二元、非二元、多处理 |
| Stacked DID | event-specific stack | 窗口内干净控制组 | 重构样本，避免跨事件污染 | 多事件动态研究 |

Callaway-Sant'Anna 的思路是先估计每个 group-time ATT，再聚合。对 cohort $g$ 和时期 $t\geq g$，用尚未处理或从未处理的组构造反事实，得到 $ATT(g,t)$。随后可以聚合为 overall ATT、calendar-time ATT、cohort ATT 或 event-time ATT。这个方法的优点是估计对象透明，控制组定义清楚，聚合权重非负且可解释。它尤其适合二元交错处理，并且可以结合协变量调整、IPW 或 doubly robust DID。

Sun-Abraham 的重点是动态事件研究。它不直接估计传统 lead/lag 回归，而是引入 cohort 与相对时期的交互项：

$$
Y_{it}
=
\alpha_i+\lambda_t+
\sum_e\sum_{\ell\neq -1}
\delta_{e\ell}
1\{G_i=e\}1\{t-e=\ell\}
+
\varepsilon_{it}.
$$

随后再对 $\delta_{e\ell}$ 做 event-time 聚合。这样可以避免某个相对时期的系数混入其他相对时期的处理效应。它的核心不是让事件研究图更好看，而是让图上的每个点尽量对应同一个相对时间的处理效应。

Borusyak-Jaravel-Spiess 的插补法则换了一个角度：先用未处理观察估计未处理潜在结果模型，

$$
Y_{it}=\alpha_i+\lambda_t+\varepsilon_{it},
$$

再把这个模型用于已处理观察，得到反事实 $\widehat Y_{it}(0)$。处理效应就是：

$$
\widehat \tau_{it}=Y_{it}-\widehat Y_{it}(0).
$$

这种方法避免用已处理观察彼此做控制，而是从未处理样本中估计反事实趋势。它对于事件研究和异质动态效应很有吸引力，尤其适合研究者愿意明确建模 $Y(0)$ 的场景。

Gardner 的 did2s 也使用两阶段思想。第一阶段只用未处理观察估计：

$$
Y_{it}=\alpha_i+\lambda_t+u_{it},
$$

得到去除固定效应后的残差化结果；第二阶段用处理变量或 event-time 指示变量解释残差化结果。它保留了回归实现的便利性，同时避免了传统 TWFE 用已处理组当控制组的问题。

de Chaisemartin-D'Haultfœuille 系列方法强调 switchers 与 clean comparisons。基本思想是比较处理状态发生变化的组与同期处理状态不变的组，排除已经被处理效应污染的比较。`did_multiplegt_dyn` 等实现也可以处理动态效应、多次进入退出、非二元处理和多个处理变量。它们尤其适合政策状态可能变化不止一次、或者处理强度不是简单吸收型 0/1 的研究。

## 六、为什么 stacked DID 值得单独理解

Stacked DID 并不是一个神秘的新估计量，而是一种非常直观的研究设计。它的基本思路是：如果有很多政策事件，每个事件周围都可以构造一个局部的 2×K 或 event-study 窗口，那么就为每个事件单独建立一个 stack。对事件 $e$，保留事件发生前后某个窗口 $[\,-L,U\,]$ 内的观察，把在这个窗口内接受处理的 cohort 作为处理组，把在窗口内尚未处理或从未处理的组作为控制组。然后把所有 stack 叠在一起估计：

$$
Y_{ist}
=
\alpha_{is}+\lambda_{ts}
+
\sum_{\ell\neq -1}
\theta_\ell
1\{t-G_s=\ell\}
+
\varepsilon_{ist},
$$

其中 $s$ 表示 stack，$\alpha_{is}$ 是 unit-by-stack 固定效应，$\lambda_{ts}$ 是 time-by-stack 固定效应。关键是固定效应和控制组都在 stack 内定义，而不是让全局 TWFE 在所有事件之间自由寻找比较。

Stacked DID 的优点是研究设计非常透明。它把“谁和谁比较”变成了一个显式选择：每个事件只和窗口内干净控制组比较，不让早已处理的组在别的事件窗口里冒充控制组。这对于多个局部政策、最低工资、城市试点、医院改革、地区性事件研究都很有用。Cengiz 等人关于最低工资的研究之所以重要，不仅是因为实证结果，也因为它展示了如何通过 stacking 的方式把多个最低工资变化事件组织成一组可解释的局部 DID。

但 stacked DID 也不是万能的。第一，窗口选择会影响估计对象，改变 $L,U$、控制组定义、是否允许尚未处理组进入，都会改变估计量。第二，同一个控制单位可能在多个 stack 中重复出现，标准误需要考虑这种重复使用。第三，stacked DID 通常牺牲一部分效率，因为它排除了一些潜在比较，只保留干净比较。第四，如果事件之间存在溢出效应，或者一个单位作为某个 stack 的控制组时已经受到其他政策的预期影响，stacked DID 仍然可能有偏。

所以 stacked DID 更准确地说是一种设计型解决方案：通过重新组织样本来构造干净比较，而不是通过一个全局回归自动纠正权重。它与 CS、SA、BJS、did2s、dCDH 的关系不是互斥的。它们共享同一条原则：先定义估计对象和有效比较，再估计和聚合。

## 七、未来的基准规范

如果研究是 2×2 DID，传统 DID 仍然可以作为基准。问题不大。但只要研究存在多个处理组、多个处理时间、动态效应、处理效应随 cohort 或时间变化、连续处理强度、多次进入退出、多个政策同时发生、时变协变量重要，或者事件研究图是核心结果，就不建议把传统 TWFE 作为唯一主结果。

更稳健的顺序应该是：先明确设计类型，再定义目标参数，然后选择干净控制组，最后使用异质性稳健方法。TWFE 可以保留，但应降级为历史对照、描述性基准或诊断对象。

| 研究场景 | 更合适的基准 | TWFE 的位置 |
|---|---|---|
| 所有处理组同一时期处理，且有清楚未处理组 | 传统 DID 或 TWFE | 可以作为主结果，但仍需平行趋势与稳健性检验 |
| 二元交错处理，关注总体效应 | CS、BJS、did2s、dCDH | 对照或附录 |
| 二元交错处理，关注动态效应 | SA、BJS event study、did2s、did_multiplegt_dyn、stacked DID | 传统 event-study 只作诊断 |
| 多个局部事件，窗口清楚 | stacked DID | 可用于对照，不作唯一解释 |
| 非二元或连续处理 | continuous DID、dCDH、处理强度 switcher design、工具变量两步法 | 除非线性同质假设很强，否则不作主结果 |
| 多个政策同时发生 | 多处理 DID、分政策 stack、排除重叠样本、dCDH 多处理方法 | 需要说明控制变量不是另一个误设处理 |
| 协变量重要 | conditional DID、outcome regression、IPW、doubly robust DID、基期协变量 × 时间固定效应 | 避免把处理后协变量当作普通控制 |

诊断也应成为常规报告的一部分。Bacon decomposition 可以说明 TWFE 混合了哪些 2×2 比较；`twowayfeweights` 可以检查隐含权重是否为负；`eventstudyweights` 可以检查事件研究系数是否被其他相对时期污染；pretrends power 和 HonestDiD 可以提醒读者，事前趋势不显著并不等于平行趋势成立。诊断的目标不是让所有估计量都通过某种形式检验，而是让读者知道结果依赖哪些比较、哪些 cohort、哪些窗口和哪些权重。

一篇使用现代 DID 的实证文章，至少应报告：处理时间分布；每个 cohort 的样本量；是否存在 never-treated、not-yet-treated 和 always-treated；event-time 每一期由哪些 cohort 识别；主估计量是哪一种；TWFE 是否仅作对照；是否检查负权重或禁止对比；是否报告稳健估计量；是否检验事前趋势；是否进行平行趋势敏感性分析；协变量是否为前定变量；标准误聚类层级；聚合权重的含义。若这些没有说明，读者很难判断 DID 的结果究竟是政策效应，还是回归权重和样本结构的产物。

也可以把实证写作组织成一个固定模板。先说明政策如何分批实施，处理组和控制组是什么，处理时间如何定义，是否有未处理组，是否有处理强度变化。再定义估计对象，例如：

$$
ATT(g,t)
=
E[Y_t(1)-Y_t(0)\mid G=g],
$$

或者 event-time ATT：

$$
ATT(\ell)
=
\sum_g a_{g\ell}ATT(g,g+\ell).
$$

然后说明聚合权重 $a_{g\ell}$ 是样本量权重、处理人数权重、cohort 权重，还是其他政策权重。主结果使用 CS、SA、BJS、did2s、dCDH 或 stacked DID；动态效应图使用异质性稳健 event-study；稳健性部分报告传统 TWFE、Bacon decomposition、权重诊断、替代控制组、替代窗口、替代聚合权重、pretrends 和 HonestDiD。最后再讨论机制与异质性，而不是在主估计对象都不清楚时过早展开机制分析。

## 八、结语

DID 的最新发展不是简单的“命令升级”。它代表一种实证研究规范的变化。过去，研究者常常先写一个 TWFE 回归，再把 $\beta$ 解释成政策效应。现在，我们需要反过来：先定义政策效应是什么，再选择能识别这个效应的估计量。

异质性 DID 的核心教训是：处理效应异质性是常态，不是异常；传统 TWFE 在复杂处理结构下可能不是无伤大雅；负权重只是问题的一部分；禁止的对比和动态污染同样重要；现代 DID 方法的共同目标是构造干净比较、明确估计对象、显式聚合权重。未来的基准规范应当是用异质性稳健方法作为主结果，用 TWFE 作为对照或诊断。

一个更好的 DID 研究，不是公式更多，而是估计对象更清楚；不是命令更新，而是研究设计更严谨。

## 参考文献

林梦芸、徐阳、郭汝飞、易君健，2025，《在模型误设的统一框架下理解双重差分方法的最新发展》，《管理世界》第 6 期。

刘冲、沙学康、张妍，2022，《交错双重差分：处理效应异质性与估计方法选择》，《数量经济技术经济研究》第 9 期。

黄炜、张子豪、刘安然，2022，《从双重差分法到事件研究法》，《产业经济评论》第 2 期。

张征宇、林丽花、曹思力、周亚虹，2024，《双重差分设计下固定效应估计量何时可信？--若干有用的建议》，《管理世界》第 1 期。

张子尧、黄炜，2023，《事件研究法的实现、问题和拓展》，《数量经济技术经济研究》第 9 期。

Borusyak, K., Jaravel, X., and Spiess, J. 2024. "Revisiting Event-Study Designs: Robust and Efficient Estimation." *Review of Economic Studies*, 91(6), 3253-3285.

Callaway, B., and Sant'Anna, P. H. C. 2021. "Difference-in-Differences with Multiple Time Periods." *Journal of Econometrics*, 225(2), 200-230.

Callaway, B., Goodman-Bacon, A., and Sant'Anna, P. H. C. 2024. "Difference-in-Differences with a Continuous Treatment." Working paper.

Cengiz, D., Dube, A., Lindner, A., and Zipperer, B. 2019. "The Effect of Minimum Wages on Low-Wage Jobs." *Quarterly Journal of Economics*, 134(3), 1405-1454.

de Chaisemartin, C., and D'Haultfœuille, X. 2020. "Two-Way Fixed Effects Estimators with Heterogeneous Treatment Effects." *American Economic Review*, 110(9), 2964-2996.

de Chaisemartin, C., and D'Haultfœuille, X. 2023. "Two-Way Fixed Effects and Differences-in-Differences with Heterogeneous Treatment Effects: A Survey." *The Econometrics Journal*, 26(3), C1-C30.

de Chaisemartin, C., and D'Haultfœuille, X. 2023. "Two-Way Fixed Effects and Differences-in-Differences Estimators with Several Treatments." *Journal of Econometrics*, 236(2), 105480.

de Chaisemartin, C., and D'Haultfœuille, X. 2024. "Difference-in-Differences Estimators of Intertemporal Treatment Effects." *Review of Economics and Statistics*.

Gardner, J. 2022. "Two-Stage Differences in Differences." Working paper.

Goodman-Bacon, A. 2021. "Difference-in-Differences with Variation in Treatment Timing." *Journal of Econometrics*, 225(2), 254-277.

Rambachan, A., and Roth, J. 2023. "A More Credible Approach to Parallel Trends." *Review of Economic Studies*, 90(5), 2555-2591.

Roth, J. 2022. "Pretest with Caution: Event-Study Estimates After Testing for Parallel Trends." *American Economic Review: Insights*, 4(3), 305-322.

Sant'Anna, P. H. C., and Zhao, J. 2020. "Doubly Robust Difference-in-Differences Estimators." *Journal of Econometrics*, 219(1), 101-122.

Sun, L., and Abraham, S. 2021. "Estimating Dynamic Treatment Effects in Event Studies with Heterogeneous Treatment Effects." *Journal of Econometrics*, 225(2), 175-199.

Wooldridge, J. M. 2021. "Two-Way Fixed Effects, the Two-Way Mundlak Regression, and Difference-in-Differences Estimators." Working paper.
