/*
 * prompt-kit.js
 * PromptKit（豆包指令库）：提示词模板面板，一键填入豆包对话框（不自动发送）
 *
 * @author    Li
 * @repository https://github.com/admin0x/promptKit
 */

(function () {
    'use strict';

    if (document.getElementById('dbp-workspace')) return;

    /* ---------------- 内置提示词库（可自行编辑 / 后续扩展为可配置） ---------------- */

    var DEFAULT_GROUPS = [
        {
            id: "flow",
            name: "漫剧制作流程",
            ordered: true,
            items: [
                {
                    title: "小说转剧本 · 第一人称润色",
                    text: "漫剧短视频小说润色智能体・专用提示词\n角色定位\n你是专为漫剧短视频创作者服务的专业小说润色智能体，核心使命是把用户输入的普通小说原文，改造成适配短视频平台的高停留、高完播文案，严格贴合漫剧短视频的传播逻辑。\n核心润色规则（必须全部遵守）\n人称强制要求全文统一使用 ** 第一人称 “我”** 叙事，绝对不切换第三人称，保持沉浸式视角，适配漫剧主角视角。\n内容精简原则\n彻底删除所有废话、冗余描写、无关铺垫、重复语句\n只保留推动剧情、塑造情绪、制造冲突的核心内容\n语言极度简洁，短句为主，节奏紧凑，符合短视频快节奏阅读习惯\n开头黄金钩子规则（重中之重）\n开头前 3 句话必须设置强悬念、抛钩子，直接制造好奇点\n禁止平淡开篇、背景铺垫、流水账开头\n开头必须精彩抓眼，瞬间拉住观众停留，让观众想继续看下去\n可使用疑问、反转、反差、危机、秘密、宿命感等钩子形式\n平台合规要求\n严格遵守所有短视频平台内容规范\n无低俗、暴力、血腥、擦边、违规导向内容\n情绪正向可控，冲突合理合规，适合漫剧可视化呈现\n漫剧适配优化\n润色后文本画面感极强，方便后续转化为漫剧分镜、台词\n保留关键对话、情绪爆发点、剧情转折点，适配短视频剪辑节奏\n整体篇幅紧凑，不拖沓，完美适配竖屏漫剧短视频的观看体验\n执行流程\n用户输入任意小说原文后，你直接输出润色后的成品文本，不提问、不解释、不额外沟通，严格按照上述规则完成第一人称精简润色，保证开头钩子拉满、内容干净紧凑、适配漫剧短视频创作。\n最终输出要求\n只输出润色完成后的文本内容，无多余前缀、后缀、注释，干净整洁，可直接用于漫剧短视频制作。"
                },
                {
                    title: "漫剧剧本生成 · 单集30秒",
                    text: "你是专业的漫剧剧本编剧，基于以上人设和故事大纲，帮我生成第【1】集的完整漫剧剧本，具体要求如下：\n1. 单集总时长30秒左右，开篇前3秒设置强看点，快速抓住用户注意力\n2. 剧本严格按照固定格式输出：【镜号】+【画面描述】+【台词/旁白】+【音效/背景音乐】+【单镜时长】\n3. 画面描述具体具象，适合AI生成漫剧画面，明确人物表情、动作、场景环境\n4. 台词口语化，符合人物人设，精简不啰嗦，每一句都有信息点\n5. 结尾设置悬念，引导用户看下一集\n6.另外还要给我一份完整的故事文字，故事里也要包含人物的对话台词\n要求：格式清晰，内容贴合大纲，不偏离人设，不添加多余解释内容"
                },
                {
                    title: "角色 · 道具 · 场景提取",
                    text: "漫剧角色道具场景提取专属智能体提示词\n核心设定指令\n你是专业漫剧短视频创作专属解析提取智能体，核心功能：接收用户输入的小说 / 故事全文，全自动精准拆解、梳理全文内容，完整提取所有出场人物角色 + 高频重复道具+场景，严格遵循指定画面风格、构图、参数标准输出详细资料，适配 AI 绘图直接复制使用。\n一、人物角色提取规则\n全覆盖提取：统计文章内所有出现的有名、无名关键人物、配角、反派、龙套核心角色，无遗漏；\n信息完整拆解：每一位角色单独分点罗列，必须包含以下全部信息：\n基础信息：角色名称、性别、预估年龄、整体身高\n面部特征：脸型、五官特点、发型、发色、妆容、气质神态、标志性外貌特点\n身形体态：体型、身材比例、肢体特征\n穿搭细节：从头到脚完整描写，上衣、下装、外套、鞋袜、配饰、饰品、特殊装饰、随身小件穿搭\n人物特质：专属气质、标志性动作、外形独有特征\n画面出图标准：\n构图：正面站立、全身完整镜头，从头到脚无裁切\n背景：纯纯白色背景，无任何杂物、场景、花纹\n风格：写实电影质感、高清写实光影、电影级打光、胶片质感、细节拉满\n形态：自然直立站姿，人体比例标准，姿态端正，无动态动作\n二、道具提取规则\n筛选标准：只提取故事中反复多次出现、高频使用、关键剧情道具、专属标志性物品，剔除一次性临时杂物；\n道具信息拆解：道具名称、外观造型、材质、颜色、尺寸、花纹细节、功能作用、独有特征；\n道具画面出图标准：纯白背景、写实电影感、高清质感、完整全景展示，单独呈现无遮挡。\n#Role:电影级纯净场景设计专家(高辨识度版)\n三，场景提取规则\n##核心执行逻辑(后台规则):\n1.**绝对真空与匿名*:画面中严禁出现任何人影，场景描述文字中严禁出现任何角色人名。\n2.**场景命名法则**:每个场景名称必须在[四个字以上]，通过具体的修饰词增加辨识度(\n严禁使用单一名词)\n3.**四大核心要素**:场景描述必须完整涵盖:[环境类型]、[具体时间】、[空间氛围】[视觉主要特征].\n4.**Prompt开头**:所有Prompt必须以\"不能出现其他人,无人纯场景,”开头。\n5.**输出控制**:严禁输出任何括号内的说明文字，直接输出具体内容。\n\n#第一步:专业场景设定表(按此格式逐一输出)\n\n**场景名称**:[四个字以上的简单命名]\n**画幅构图**:横向16:9电影级场景设定图，极高画质，纯净无人的空间。写实电影风格\n*视觉风格*:[填入用户指定风格]，极致细节。\n**场景描述**:\n[具体的地理/建筑空间属性][环境类型】\n[时间时刻】[精确到时段的天气与光线状态]\n[空间氛国】[如:压抑、神圣、破败、宁静等视觉情绪描述][主要特征]:[具体的材质、核心物件、前中后景的标志性元素，严禁提及角色姓名]**Prompt(直接复制)**:不能出现其他人，无人，纯场景，[将上述所有环境细节融合成一段精简、极具冲击力的生图描述词，包含:no humans,empty,landscape only]\n\n三、输出格式要求\n内容分区排版，分为【全文全部角色档案】【高频关键道具清单】【故事场景】三大板块，清晰明了；\n每个角色独立分段，信息条理清晰，不杂乱、不精简，细节完整；\n末尾附带对应写实电影风纯白背景全身立绘通用绘图提示词，可直接复制用于 AI 生成角色图；\n语言简洁专业，无多余废话、无无关解读、无剧情复述，只输出角色 + 道具+场景解析内容。\n四、固定强制约束\n严格固定：专业角色设定表，纯白色极简背景，无多余元素，AI 仿真人电影级质感，极高画质，电影级柔光电影光效，写实人像渲染，8K 超清。人物正面站立全身照，绝不更改风格与构图；\n严格抠细节，还原小说原文描写，原文无明确数据则结合人设合理写实推断；\n全程纯中文输出，无英文、无乱码、无特殊符号；\n用户直接粘贴小说文本即可自动执行以上全部规则，一键解析生成成品内容。"
                },
                {
                    title: "角色三视图设定板",
                    text: "一张高精度、干净极简的角色设定板/人物三视图参考页，纯白背景，整体像游戏角色建模设定图，时装人物设定sheet、角色turnaround board，排版整齐清晰，信息分区明确，写实高级质感，统一光线、统一人物一致性。\n\n画面左侧为人物全身三视图，占据主要视觉区域，分别展示:\n1.正面全身站姿\n2.左侧面全身站姿\n3.背面全身站姿\n\n三个人物必须是同一个角色，五官、发型、服装、体型、身高比例完全一致，站姿自然，双臂自然下垂，适合做角色建模参考，镜头为平视，中性棚拍光，无遮挡，无夸张透视，无复杂背景。\n画面右侧分为上下两个板块:\n右上区域放置六张人物头像/头部视角图，排列整齐，展示同一人物的不同头部角度，包括：\n1.正面头像\n2.低头俯视头顶角度\n3.后脑勺/后方头部视角\n4.左侧练轮廓\n5.近距离正侧脸对照角度\n6.3/4侧脸头像\n要求头发走向清晰，发缝清晰，五官统一，适合作为人物头部设定参考。\n\n右下区域放置六张人物局部细节图，排列成整齐小方格，展示角色关键细节，包括:\n1.上衣面料质感特写\n2.下身正面局部特写\n3.臀部剪裁特写\n4.腿部或皮肤局部细节\n5.眼部或五官局部特写\n6.鞋子完整单品特写\n\n所有细节图都要与主角色服装和人物完全一致，材质真实，细节干净，适合作为角色服饰建模参考。\n整体风格要求:\n极简、专业、写实、统一、干净、高级、类似角色设定板、时装设计参考图、3D角色建模参考页、角色三视图展示板。人物边缘清晰，服装版型明确，发丝自然，皮肤细腻，材质表现准确。整体排版留白充足，像专业美术团队制作的人物设定页。\n人物设定:\n【人物形象描述]\n输出要求:\n横版构图，白底，完整人物，不裁切，不出现多余道具，不出现文字说明，不出现LOGO，不出现水印，不出现UI界面元素，不出现点赞收藏按钮，不出现社交媒体截图感"
                },
                {
                    title: "分镜脚本 · 10秒版",
                    text: "根据旁白和对话拆分分镜头\n分镜脚本提示词要求如下:\n[内容镜头一致性原则】内容以35-50个字以内进行一次分镜头拆分，要求拆分出的单句文案内容要完整\n示例:内容:\"民国年间，李老根是山里的守林人，专管夜间巡山护林。这夜乌云压顶，连残月都被遮得严实，山风卷着枯叶鸣鸣作响。他挎着煤油灯，灯芯被风刮得突突乱跳，刚摸进山神庙后坡的窄道，就见道旁的枯树根上，立着个半尺高的黄皮子。\"拆分出两段文案:\n民国年间，李老根是山里的守林人，专管夜间巡山护林。这夜乌云压顶，连残月都被遮得严实，山风卷着枯叶鸣鸣作响。\n他挎着煤油灯，灯芯被风刮得突突乱跳，刚摸进山神庙后坡的窄道，就见道旁的枯树根上，立着个半尺高的黄皮子。\n或者三段文案:\n民国年间，李老根是山里的守林人，专管夜间巡山护林。这夜乌云压顶，连残月都被\n遮得严实山风卷着枯叶鸣鸣作响。他挎着煤油灯，灯芯被风刮得突突乱跳刚摸进山神庙后坡的窄道，就见道旁的枯树根上，立着个半尺高的黄皮子。然后针对拆分后的文案分别进行提示词描写[核心目标与原则】图片提示词内不能带有乱七八糟的文字标识，不需要给出角色映射视频提示词中前后分镜必须要有关联性，需要思考上个画面;保证情节连贯:人物、场时间必须在相邻分镜中保持高度一致性景\n【重要】视频提示词一定要有角色标签映射语句，一定要包含所有视频提示词中应该出现的角色，没有出现的角色不能写在角色标签映射中\n【很重要】视频提示词要求:必须严格按照参考案例给出，每次给出都需要仔细思考和上个场景是否关联,前后分镜必须要有关联性，需要思考上个画面内容后给出\n【十分重要】:文案中对话放入视频提示词词用”\"做标注，必须严格按照当前视频提示词结构给出包含镜头，环境音/对话/细微肢体动作发声/合适的地方给出解说注:必须用白话文方式给出解说或者对话注意事项:(切记:不是当前角色台词不需要有张嘴、喉部动等疑似发声动作，嘴唇动作需要和台词同步，台词时段镜头固定，不切换、不推拉)[重要】不要重复生成上下分镜已经有的镜头，和上下分镜的故事情节要连贯\n【3秒决策原则】执行前必检\n人物是否齐全?一严格映射角色信息，未出现角色绝不写入场景是否连贯?一时间(晨/午/晚)/地点/光线必须与上一镜一致有无违禁内容?一自动过滤血腥/低俗/政治敏感词一任一条件不满足，立即中止并重新推理\n【六维一致性准则】\n人物一致:出现角色必须严格匹配角色信息库，未出现角色绝不写入时空一致:相邻分镜时间(晨/午/晚)、地点、光线必须无缝衔接物品一致:关键道具(如钢笔/背包)位置状态需延续上一镜动作连贯:新分镜起始动作必须承接上一镜结束状态\n台词合规:仅当前说话角色有张嘴动作，台词用\"\"标注敏感过滤:自动替换违禁词(替换规则:用中性词保持剧情逻辑)\n[分镜生成四步法]STEP1场景锚定一提取章节文案时间/地点/人物三角要素STEP2连续性检查一比对上一镜结尾状态(动作/台词/物品位置)STEP3台词植入一仅当章节文案含对话时添加\"台词\"字段STEP4 敏感扫描一自动替换违禁词(替换规则:用中性词保持剧情逻辑)\n镜头+音效+台词(严格按时间轴):\n[0-3秒]镜头:[景别]+[镜头]+[核心动作];音效:[主音效]+[环境音];[台词/画外音]\n[3-6秒]镜头:[景别]+[镜头]+[互动反应];音效:[关键音效];[台词/画外音]\n[6-8秒]镜头:[景别]+[镜头]+[情绪特写];音效:[氛围音];[画外音/沉默说明]\n[8-10秒]镜头:[景别]+[镜头]+[下一镜铺垫];音效:[过渡音]\n[遵循要求】\n1.*中文输出**:所有提示词必须使用中文描述，输出的提示词必须不能包含英文引号\"，必须使用中文引号”\n2.**标点格式**:输出的提示词必须不能包含英文引号”，必须使用中文引号”3.*视频提示词要求:严格参考输出示例，每个画面为10秒，由1-4秒每个镜头所组成，必须严格按照参考案例给出\n4.**场景信息“*给出的场景信息对应后一字不改的放到我需要的位置5.*图片提示词*图片提示词内不需要映射人物，非常重要6.景别多使用近景，特写，大特写等，不使用远景，少使用中景7.拆分文案内容要合理\n[结果要求]\n数量严格控制:任务是为输入信息中的章节文案中的每一项生成一个对应的分镜。输出记录的总数必须与章节文案的条目数完全相等。禁止根据小说原文或推文文案的长短阜行拆分或合并分镜。\n分镜解析:逐条解析章节文案，给出人物姓名，重点描写动作、表情，结合[角色信息】与整体情节，明确视角与景别。\n提示词推理限制:如果出现违禁词需要自动替换意思相近的中性词，保证新的视频提示词不得出现任何违禁词，违禁词包括词典如下:血腥暴力类(重点屏蔽)血液相关:血液飞溅、喷血、鲜血淋漓、血池、血祭、断头血、内脏出血、血腥场面、血债、血洗(具象化描述)暴力场景:分尸、碎尸、斩首、砍头、挖眼、掏心、剥皮、凌迟、虐杀、酷刑、断肢、爆头、穿刺、撕咬(含肢体伤害的具体动作)其他暴力:屠杀、灭门、焚尸、鞭尸、尸横遍野、血肉模糊、骨裂、脑浆、内脏外露、残肢断臂\n裸露低俗类(重点屏蔽)直接裸露:全裸、半裸、袒胸露背(过度)、露脐(低俗化)、露臂、露私密部位、一丝不挂、裸体、赤操低俗暗示:性感暴露、挑逗性裸露、低俗姿势、暴露隐私部位、酥胸半露(过度)、衣不蔽体(非副情必要的低俗化描述)违规场:景:色情暗示、艳情、低俗互动、性挑逗、裸露祭祀(无合理剧情支撑的裸露)色情与性暗示类(易与裸露关联)核心违禁:色情、淫秽、嫖娼、卖淫、性交易、一夜情、通奸、乱伦、恋童、兽交暗示类:约炮、撩骚、打炮、床上戏(低俗化)、胸器、美腿诱惑、性感撩拔、暧昧低俗、艳舞、脱衣舞敏感部位描述:乳房、阴部、阴茎、臀部(直白描述，非医学/正常剧情场景)\n其他高危敏感词(修仙创作易踩坑)封建迷信(强化版):血腥祭祀、活人献祭、血咒、尸变、僵尸吸血、妖魔鬼怪(恐怖化描述，如\"食人恶鬼\")危害公序良俗:自残、自杀、暴力教峻、聚众斗殴、黑帮火拼、恐佈袭击、校园暴力(具象化场景)敏感宗教/政治:邪教仪式、极端宗教、分裂、恐怖组织、反动、颠覆(避免修仙设定与敏感元素绑定)\n[输出自检机制】✅字段数校验:必须且只能有3字段\n(panel_index/prompt/video_prompt)\n✅引号校验:所有对话必须用中文引号”，禁用英文引号”\n✅长度校验:video_prompts500字符\n✅人物校验:video_prompt出现的角色必须100%映射角色信息\n✅场景校验:prompt必须包含原始场景信息(一字不改)\n✅连贯校验:video_prompt必须包含\"衔接前置指令\"段落\n\n\n\n[高频错误避坑指南】x错误:林辰在会议室突然出现咖啡罐(上镜在格子间)\n√正确:林辰揉眼蹭墨痕(延续上镜断笔沾墨状态)\n×错误:写入禾出现的\"王经理\"角色映射\n√正确:仅写入画面实际出现角色(如仅林辰/张岚则只映射这两人)\n×错误:“林辰嘴角流血”(违禁描述)\n√正确:“林辰紧咬下唇，衣领有红痕\"(保持伤势暗示)\n×错误:台词时镜头切换/推拉\n√正确:台词时段固定镜头，标注\"镜头稳定，不推拉”\n\n[输出格式】\n**输出示例: **\n如果有针对同一段文案拆分后的子文案，则格式为:\n分镜头1\n原文案:\"民国年间，李老根是山里的守林人，专管夜间巡山护林。这夜乌云压顶，连残月都被遮得严实，山风卷看枯叶鸣鸣作响。他挎着煤油灯，灯芯被风刮得突突乱跳，刚摸进山神庙后坡的窄道，就见道旁的枯树根上，立着个半尺高的黄皮子。”\n子文案:民国年间，李老根是山里的守林人，专管夜间巡山护林。这夜乌云压顶，连残月都被遮得严实\n分镜头1-1:\n[0-3秒]镜头:近景，侧面拍摄，女孩双膝跪地，上半身直立，双手慢慢举起合十，往前伸展，说:\"黄天在上，厚土为证\";音效:流水声。\n[3-4秒]镜头:特写女孩合十的双手;音效:树叶声\n[4-8秒]镜头:俯拍特写女孩脸部，说:“我愿用我领导倒霉10年换我今年财源滚滚\"，近景背面拍摄停留0.5秒，镜头转侧面拍摄停留0.5秒;音效:说话声\n[8-10秒]镜头:特写女孩双眼，然后眼神猛地发狠，嘴里说:\"如果十年不够，那就让他倒霉一辈子，保佑”，镜头转全景，背面拍摄，女孩对着群山直接往下扣头;音效:小桥流水声音\n场景:日系动漫电影质感场景，黄昏日落时分的山间高地，地面由粗糙岩石与稀疏枯黄杂草组成，远处层叠山峦笼罩着朦胧薄雾，天空呈现橙黄一粉紫一淡紫的渐变色彩，太阳投射带有柔和光晕的光束，暖色调光影均匀覆盖场景，画面氛围梦幻治愈，细腻的色彩过渡与轻盈的光影渲:\n\n子文案:山风卷看枯叶鸣鸣作响。他挎着煤油灯，灯芯被风刮得突突乱跳，\n分镜头1-2:\n[0-3秒】镜头:近景，侧面拍摄，女孩双膝跪地，上半身直立，双手慢慢举起合十，往前伸展，说:\"黄天在上，厚土为证\";音效:流水声。\n[3-4秒]镜头:特写女孩合十的双手;音效:树叶声[4-8秒]镜头:俯拍特写女孩脸部，说:“我愿用我领导倒霉10年换我今年财源滚滚\"，近景背面拍摄停留0.5秒，镜头转侧面拍摄停留0.5秒;音效:说话声\n[8-10秒]镜头:特写女孩双眼，然后眼神猛地发狠，嘴里说:\"如果十年不够，那就让他倒霉一辈子，保佑”，镜头转全景，背面拍摄，女孩对着群山直接往下扣头;音效:小桥流水声音\n场景:日系动漫电影质感场景，黄昏日落时分的山间高地，地面由粗糙岩石与稀疏枯黄杂草组成，远处层叠山峦笼罩着朦胧薄雾，天空呈现橙黄一粉紫一淡紫的渐变色彩，太阳投射带有柔和光晕的光束，暖色调光影均匀覆盖场景，画面氛围梦幻治愈，细腻的色彩过渡与轻盈的光影渲\n\n子文案:刚摸进山神庙后坡的窄道，就见道旁的枯树根上，立看个半尺高的黄皮子\n分镜头1-3:\n[0-3秒】镜头:近景，侧面拍摄，女孩双膝跪地，上半身直立，双手慢慢举起合十，往前伸展，说:\"黄天在上，厚土为证\";音效:流水声。\n[3-4秒]镜头:特写女孩合十的双手;音效:树叶声[4-8秒]镜头:俯拍特写女孩脸部，说:“我愿用我领导倒霉10年换我今年财源滚滚\"，近景背面拍摄停留0.5秒，镜头转侧面拍摄停留0.5秒;音效:说话声\n[8-10秒]镜头:特写女孩双眼，然后眼神猛地发狠，嘴里说:\"如果十年不够，那就让他倒霉一辈子，保佑”，镜头转全景，背面拍摄，女孩对着群山直接往下扣头;音效:小桥流水声音\n场景:日系动漫电影质感场景，黄昏日落时分的山间高地，地面由粗糙岩石与稀疏枯黄杂草组成，远处层叠山峦笼罩着朦胧薄雾，天空呈现橙黄一粉紫一淡紫的渐变色彩，太阳投射带有柔和光晕的光束，暖色调光影均匀覆盖场景，画面氛围梦幻治愈，细腻的色彩过渡与轻盈的光影渲\n\n如果没有针对同一段文案进行拆分，则格式为\n\n原文案;\"民国年间，李老根是山里的守林人，专管夜间巡山护林”\n分镜头1:\n[0-3秒】镜头:近景，侧面拍摄，女孩双膝跪地，上半身直立，双手慢慢举起合十，往前伸展，说:\"黄天在上，厚土为证\";音效:流水声。\n[3-4秒]镜头:特写女孩合十的双手;音效:树叶声[4-8秒]镜头:俯拍特写女孩脸部，说:“我愿用我领导倒霉10年换我今年财源滚滚\"，近景背面拍摄停留0.5秒，镜头转侧面拍摄停留0.5秒;音效:说话声\n[8-10秒]镜头:特写女孩双眼，然后眼神猛地发狠，嘴里说:\"如果十年不够，那就让他倒霉一辈子，保佑”，镜头转全景，背面拍摄，女孩对着群山直接往下扣头;音效:小桥流水声音\n场景:日系动漫电影质感场景，黄昏日落时分的山间高地，地面由粗糙岩石与稀疏枯黄杂草组成，远处层叠山峦笼罩着朦胧薄雾，天空呈现橙黄一粉紫一淡紫的渐变色彩，太阳投射带有柔和光晕的光束，暖色调光影均匀覆盖场景，画面氛围梦幻治愈，细腻的色彩过渡与轻盈的光影渲\n\n原文案:\"民国年间，李老根是山里的守林人，专管夜间巡山护林”\n分镜头2:\n[0-3秒】镜头:近景，侧面拍摄，女孩双膝跪地，上半身直立，双手慢慢举起合十，往前伸展，说:\"黄天在上，厚土为证\";音效:流水声。\n[3-4秒]镜头:特写女孩合十的双手;音效:树叶声[4-8秒]镜头:俯拍特写女孩脸部，说:“我愿用我领导倒霉10年换我今年财源滚滚\"，近景背面拍摄停留0.5秒，镜头转侧面拍摄停留0.5秒;音效:说话声\n[8-10秒]镜头:特写女孩双眼，然后眼神猛地发狠，嘴里说:\"如果十年不够，那就让他倒霉一辈子，保佑”，镜头转全景，背面拍摄，女孩对着群山直接往下扣头;音效:小桥流水声音\n场景:日系动漫电影质感场景，黄昏日落时分的山间高地，地面由粗糙岩石与稀疏枯黄杂草组成，远处层叠山峦笼罩着朦胧薄雾，天空呈现橙黄一粉紫一淡紫的渐变色彩，太阳投射带有柔和光晕的光束，暖色调光影均匀覆盖场景，画面氛围梦幻治愈，细腻的色彩过渡与轻盈的光影渲\n\n原文案:刚摸进山神庙后坡的窄道，就见道旁的枯树根上，立看个半尺高的黄皮子\n分镜头3\n[0-3秒】镜头:近景，侧面拍摄，女孩双膝跪地，上半身直立，双手慢慢举起合十，往前伸展，说:\"黄天在上，厚土为证\";音效:流水声。\n[3-4秒]镜头:特写女孩合十的双手;音效:树叶声[4-8秒]镜头:俯拍特写女孩脸部，说:“我愿用我领导倒霉10年换我今年财源滚滚\"，近景背面拍摄停留0.5秒，镜头转侧面拍摄停留0.5秒;音效:说话声\n[8-10秒]镜头:特写女孩双眼，然后眼神猛地发狠，嘴里说:\"如果十年不够，那就让他倒霉一辈子，保佑”，镜头转全景，背面拍摄，女孩对着群山直接往下扣头;音效:小桥流水声音\n场景:日系动漫电影质感场景，黄昏日落时分的山间高地，地面由粗糙岩石与稀疏枯黄杂草组成，远处层叠山峦笼罩着朦胧薄雾，天空呈现橙黄一粉紫一淡紫的渐变色彩，太阳投射带有柔和光晕的光束，暖色调光影均匀覆盖场景，画面氛围梦幻治愈，细腻的色彩过渡与轻盈的光影渲\n\n在提示词前面加上写实电影感风格，不要背景音乐。不要字幕"
                },
                {
                    title: "分镜脚本 · 15秒版",
                    text: "根据旁白和对话拆分分镜头\n分镜脚本提示词要求如下:\n[内容镜头一致性原则】内容以35-50个字以内进行一次分镜头拆分，要求拆分出的单句文案内容要完整\n示例:内容:\"民国年间，李老根是山里的守林人，专管夜间巡山护林。这夜乌云压顶，连残月都被遮得严实，山风卷着枯叶鸣鸣作响。他挎着煤油灯，灯芯被风刮得突突乱跳，刚摸进山神庙后坡的窄道，就见道旁的枯树根上，立着个半尺高的黄皮子。\"拆分出两段文案:\n民国年间，李老根是山里的守林人，专管夜间巡山护林。这夜乌云压顶，连残月都被遮得严实，山风卷着枯叶鸣鸣作响。\n他挎着煤油灯，灯芯被风刮得突突乱跳，刚摸进山神庙后坡的窄道，就见道旁的枯树根上，立着个半尺高的黄皮子。\n或者三段文案:\n民国年间，李老根是山里的守林人，专管夜间巡山护林。这夜乌云压顶，连残月都被\n遮得严实山风卷着枯叶鸣鸣作响。他挎着煤油灯，灯芯被风刮得突突乱跳刚摸进山神庙后坡的窄道，就见道旁的枯树根上，立着个半尺高的黄皮子。然后针对拆分后的文案分别进行提示词描写[核心目标与原则】图片提示词内不能带有乱七八糟的文字标识，不需要给出角色映射视频提示词中前后分镜必须要有关联性，需要思考上个画面;保证情节连贯:人物、场时间必须在相邻分镜中保持高度一致性景\n【重要】视频提示词一定要有角色标签映射语句，一定要包含所有视频提示词中应该出现的角色，没有出现的角色不能写在角色标签映射中\n【很重要】视频提示词要求:必须严格按照参考案例给出，每次给出都需要仔细思考和上个场景是否关联,前后分镜必须要有关联性，需要思考上个画面内容后给出\n【十分重要】:文案中对话放入视频提示词词用”\"做标注，必须严格按照当前视频提示词结构给出包含镜头，环境音/对话/细微肢体动作发声/合适的地方给出解说注:必须用白话文方式给出解说或者对话注意事项:(切记:不是当前角色台词不需要有张嘴、喉部动等疑似发声动作，嘴唇动作需要和台词同步，台词时段镜头固定，不切换、不推拉)[重要】不要重复生成上下分镜已经有的镜头，和上下分镜的故事情节要连贯\n【3秒决策原则】执行前必检\n人物是否齐全?一严格映射角色信息，未出现角色绝不写入场景是否连贯?一时间(晨/午/晚)/地点/光线必须与上一镜一致有无违禁内容?一自动过滤血腥/低俗/政治敏感词一任一条件不满足，立即中止并重新推理\n【六维一致性准则】\n人物一致:出现角色必须严格匹配角色信息库，未出现角色绝不写入时空一致:相邻分镜时间(晨/午/晚)、地点、光线必须无缝衔接物品一致:关键道具(如钢笔/背包)位置状态需延续上一镜动作连贯:新分镜起始动作必须承接上一镜结束状态\n台词合规:仅当前说话角色有张嘴动作，台词用\"\"标注敏感过滤:自动替换违禁词(替换规则:用中性词保持剧情逻辑)\n[分镜生成四步法]STEP1场景锚定一提取章节文案时间/地点/人物三角要素STEP2连续性检查一比对上一镜结尾状态(动作/台词/物品位置)STEP3台词植入一仅当章节文案含对话时添加\"台词\"字段STEP4 敏感扫描一自动替换违禁词(替换规则:用中性词保持剧情逻辑)\n镜头+音效+台词(严格按时间轴):\n[0-4秒]镜头:[景别]+[镜头]+[核心动作];音效:[主音效]+[环境音];[台词/画外音]\n[4-8秒]镜头:[景别]+[镜头]+[互动反应];音效:[关键音效];[台词/画外音]\n[8-12秒]镜头:[景别]+[镜头]+[情绪特写];音效:[氛围音];[画外音/沉默说明]\n[12-15秒]镜头:[景别]+[镜头]+[下一镜铺垫];音效:[过渡音]\n[遵循要求】\n1.*中文输出**:所有提示词必须使用中文描述，输出的提示词必须不能包含英文引号\"，必须使用中文引号”\n2.**标点格式**:输出的提示词必须不能包含英文引号”，必须使用中文引号”3.*视频提示词要求:严格参考输出示例，每个画面为10秒，由1-4秒每个镜头所组成，必须严格按照参考案例给出\n4.**场景信息“*给出的场景信息对应后一字不改的放到我需要的位置5.*图片提示词*图片提示词内不需要映射人物，非常重要6.景别多使用近景，特写，大特写等，不使用远景，少使用中景7.拆分文案内容要合理\n[结果要求]\n数量严格控制:任务是为输入信息中的章节文案中的每一项生成一个对应的分镜。输出记录的总数必须与章节文案的条目数完全相等。禁止根据小说原文或推文文案的长短阜行拆分或合并分镜。\n分镜解析:逐条解析章节文案，给出人物姓名，重点描写动作、表情，结合[角色信息】与整体情节，明确视角与景别。\n提示词推理限制:如果出现违禁词需要自动替换意思相近的中性词，保证新的视频提示词不得出现任何违禁词，违禁词包括词典如下:血腥暴力类(重点屏蔽)血液相关:血液飞溅、喷血、鲜血淋漓、血池、血祭、断头血、内脏出血、血腥场面、血债、血洗(具象化描述)暴力场景:分尸、碎尸、斩首、砍头、挖眼、掏心、剥皮、凌迟、虐杀、酷刑、断肢、爆头、穿刺、撕咬(含肢体伤害的具体动作)其他暴力:屠杀、灭门、焚尸、鞭尸、尸横遍野、血肉模糊、骨裂、脑浆、内脏外露、残肢断臂\n裸露低俗类(重点屏蔽)直接裸露:全裸、半裸、袒胸露背(过度)、露脐(低俗化)、露臂、露私密部位、一丝不挂、裸体、赤操低俗暗示:性感暴露、挑逗性裸露、低俗姿势、暴露隐私部位、酥胸半露(过度)、衣不蔽体(非副情必要的低俗化描述)违规场:景:色情暗示、艳情、低俗互动、性挑逗、裸露祭祀(无合理剧情支撑的裸露)色情与性暗示类(易与裸露关联)核心违禁:色情、淫秽、嫖娼、卖淫、性交易、一夜情、通奸、乱伦、恋童、兽交暗示类:约炮、撩骚、打炮、床上戏(低俗化)、胸器、美腿诱惑、性感撩拔、暧昧低俗、艳舞、脱衣舞敏感部位描述:乳房、阴部、阴茎、臀部(直白描述，非医学/正常剧情场景)\n其他高危敏感词(修仙创作易踩坑)封建迷信(强化版):血腥祭祀、活人献祭、血咒、尸变、僵尸吸血、妖魔鬼怪(恐怖化描述，如\"食人恶鬼\")危害公序良俗:自残、自杀、暴力教峻、聚众斗殴、黑帮火拼、恐佈袭击、校园暴力(具象化场景)敏感宗教/政治:邪教仪式、极端宗教、分裂、恐怖组织、反动、颠覆(避免修仙设定与敏感元素绑定)\n[输出自检机制】✅字段数校验:必须且只能有3字段\n(panel_index/prompt/video_prompt)\n✅引号校验:所有对话必须用中文引号”，禁用英文引号”\n✅长度校验:video_prompts500字符\n✅人物校验:video_prompt出现的角色必须100%映射角色信息\n✅场景校验:prompt必须包含原始场景信息(一字不改)\n✅连贯校验:video_prompt必须包含\"衔接前置指令\"段落\n\n\n\n[高频错误避坑指南】x错误:林辰在会议室突然出现咖啡罐(上镜在格子间)\n√正确:林辰揉眼蹭墨痕(延续上镜断笔沾墨状态)\n×错误:写入禾出现的\"王经理\"角色映射\n√正确:仅写入画面实际出现角色(如仅林辰/张岚则只映射这两人)\n×错误:“林辰嘴角流血”(违禁描述)\n√正确:“林辰紧咬下唇，衣领有红痕\"(保持伤势暗示)\n×错误:台词时镜头切换/推拉\n√正确:台词时段固定镜头，标注\"镜头稳定，不推拉”\n\n[输出格式】\n**输出示例: **\n如果有针对同一段文案拆分后的子文案，则格式为:\n分镜头1\n原文案:\"民国年间，李老根是山里的守林人，专管夜间巡山护林。这夜乌云压顶，连残月都被遮得严实，山风卷看枯叶鸣鸣作响。他挎着煤油灯，灯芯被风刮得突突乱跳，刚摸进山神庙后坡的窄道，就见道旁的枯树根上，立着个半尺高的黄皮子。”\n子文案:民国年间，李老根是山里的守林人，专管夜间巡山护林。这夜乌云压顶，连残月都被遮得严实\n分镜头1-1:\n[0-4秒]镜头:近景，侧面拍摄，女孩双膝跪地，上半身直立，双手慢慢举起合十，往前伸展，说:\"黄天在上，厚土为证\";音效:流水声。\n[4-8秒]镜头:特写女孩合十的双手;音效:树叶声\n[8-12秒]镜头:俯拍特写女孩脸部，说:“我愿用我领导倒霉10年换我今年财源滚滚\"，近景背面拍摄停留0.5秒，镜头转侧面拍摄停留0.5秒;音效:说话声\n[12-15秒]镜头:特写女孩双眼，然后眼神猛地发狠，嘴里说:\"如果十年不够，那就让他倒霉一辈子，保佑”，镜头转全景，背面拍摄，女孩对着群山直接往下扣头;音效:小桥流水声音\n场景:日系动漫电影质感场景，黄昏日落时分的山间高地，地面由粗糙岩石与稀疏枯黄杂草组成，远处层叠山峦笼罩着朦胧薄雾，天空呈现橙黄一粉紫一淡紫的渐变色彩，太阳投射带有柔和光晕的光束，暖色调光影均匀覆盖场景，画面氛围梦幻治愈，细腻的色彩过渡与轻盈的光影渲:\n\n子文案:山风卷看枯叶鸣鸣作响。他挎着煤油灯，灯芯被风刮得突突乱跳，\n分镜头1-2:\n[0-4秒】镜头:近景，侧面拍摄，女孩双膝跪地，上半身直立，双手慢慢举起合十，往前伸展，说:\"黄天在上，厚土为证\";音效:流水声。\n[4-8秒]镜头:特写女孩合十的双手;音效:树叶声\n[8-12秒]镜头:俯拍特写女孩脸部，说:“我愿用我领导倒霉10年换我今年财源滚滚\"，近景背面拍摄停留0.5秒，镜头转侧面拍摄停留0.5秒;音效:说话声\n[12-15秒]镜头:特写女孩双眼，然后眼神猛地发狠，嘴里说:\"如果十年不够，那就让他倒霉一辈子，保佑”，镜头转全景，背面拍摄，女孩对着群山直接往下扣头;音效:小桥流水声音\n场景:日系动漫电影质感场景，黄昏日落时分的山间高地，地面由粗糙岩石与稀疏枯黄杂草组成，远处层叠山峦笼罩着朦胧薄雾，天空呈现橙黄一粉紫一淡紫的渐变色彩，太阳投射带有柔和光晕的光束，暖色调光影均匀覆盖场景，画面氛围梦幻治愈，细腻的色彩过渡与轻盈的光影渲\n\n子文案:刚摸进山神庙后坡的窄道，就见道旁的枯树根上，立看个半尺高的黄皮子\n分镜头1-3:\n[0-4秒】镜头:近景，侧面拍摄，女孩双膝跪地，上半身直立，双手慢慢举起合十，往前伸展，说:\"黄天在上，厚土为证\";音效:流水声。\n[4-8秒]镜头:特写女孩合十的双手;音效:树叶声\n[8-12秒]镜头:俯拍特写女孩脸部，说:“我愿用我领导倒霉10年换我今年财源滚滚\"，近景背面拍摄停留0.5秒，镜头转侧面拍摄停留0.5秒;音效:说话声\n[12-15秒]镜头:特写女孩双眼，然后眼神猛地发狠，嘴里说:\"如果十年不够，那就让他倒霉一辈子，保佑”，镜头转全景，背面拍摄，女孩对着群山直接往下扣头;音效:小桥流水声音\n场景:日系动漫电影质感场景，黄昏日落时分的山间高地，地面由粗糙岩石与稀疏枯黄杂草组成，远处层叠山峦笼罩着朦胧薄雾，天空呈现橙黄一粉紫一淡紫的渐变色彩，太阳投射带有柔和光晕的光束，暖色调光影均匀覆盖场景，画面氛围梦幻治愈，细腻的色彩过渡与轻盈的光影渲\n\n如果没有针对同一段文案进行拆分，则格式为\n\n原文案;\"民国年间，李老根是山里的守林人，专管夜间巡山护林”\n分镜头1:\n[0-4秒】镜头:近景，侧面拍摄，女孩双膝跪地，上半身直立，双手慢慢举起合十，往前伸展，说:\"黄天在上，厚土为证\";音效:流水声。\n[4-8秒]镜头:特写女孩合十的双手;音效:树叶声\n[8-12秒]镜头:俯拍特写女孩脸部，说:“我愿用我领导倒霉10年换我今年财源滚滚\"，近景背面拍摄停留0.5秒，镜头转侧面拍摄停留0.5秒;音效:说话声\n[12-15秒]镜头:特写女孩双眼，然后眼神猛地发狠，嘴里说:\"如果十年不够，那就让他倒霉一辈子，保佑”，镜头转全景，背面拍摄，女孩对着群山直接往下扣头;音效:小桥流水声音\n场景:日系动漫电影质感场景，黄昏日落时分的山间高地，地面由粗糙岩石与稀疏枯黄杂草组成，远处层叠山峦笼罩着朦胧薄雾，天空呈现橙黄一粉紫一淡紫的渐变色彩，太阳投射带有柔和光晕的光束，暖色调光影均匀覆盖场景，画面氛围梦幻治愈，细腻的色彩过渡与轻盈的光影渲\n\n原文案:\"民国年间，李老根是山里的守林人，专管夜间巡山护林”\n分镜头2:\n[0-4秒】镜头:近景，侧面拍摄，女孩双膝跪地，上半身直立，双手慢慢举起合十，往前伸展，说:\"黄天在上，厚土为证\";音效:流水声。\n[4-8秒]镜头:特写女孩合十的双手;音效:树叶声\n[8-12秒]镜头:俯拍特写女孩脸部，说:“我愿用我领导倒霉10年换我今年财源滚滚\"，近景背面拍摄停留0.5秒，镜头转侧面拍摄停留0.5秒;音效:说话声\n[12-15秒]镜头:特写女孩双眼，然后眼神猛地发狠，嘴里说:\"如果十年不够，那就让他倒霉一辈子，保佑”，镜头转全景，背面拍摄，女孩对着群山直接往下扣头;音效:小桥流水声音\n场景:日系动漫电影质感场景，黄昏日落时分的山间高地，地面由粗糙岩石与稀疏枯黄杂草组成，远处层叠山峦笼罩着朦胧薄雾，天空呈现橙黄一粉紫一淡紫的渐变色彩，太阳投射带有柔和光晕的光束，暖色调光影均匀覆盖场景，画面氛围梦幻治愈，细腻的色彩过渡与轻盈的光影渲\n\n原文案:刚摸进山神庙后坡的窄道，就见道旁的枯树根上，立看个半尺高的黄皮子\n分镜头3\n[0-4秒】镜头:近景，侧面拍摄，女孩双膝跪地，上半身直立，双手慢慢举起合十，往前伸展，说:\"黄天在上，厚土为证\";音效:流水声。\n[4-8秒]镜头:特写女孩合十的双手;音效:树叶声\n[8-12秒]镜头:俯拍特写女孩脸部，说:“我愿用我领导倒霉10年换我今年财源滚滚\"，近景背面拍摄停留0.5秒，镜头转侧面拍摄停留0.5秒;音效:说话声\n[12-15秒]镜头:特写女孩双眼，然后眼神猛地发狠，嘴里说:\"如果十年不够，那就让他倒霉一辈子，保佑”，镜头转全景，背面拍摄，女孩对着群山直接往下扣头;音效:小桥流水声音\n场景:日系动漫电影质感场景，黄昏日落时分的山间高地，地面由粗糙岩石与稀疏枯黄杂草组成，远处层叠山峦笼罩着朦胧薄雾，天空呈现橙黄一粉紫一淡紫的渐变色彩，太阳投射带有柔和光晕的光束，暖色调光影均匀覆盖场景，画面氛围梦幻治愈，细腻的色彩过渡与轻盈的光影渲\n\n在提示词前面加上写实电影感风格，不要背景音乐。不要字幕"
                },
                {
                    title: "旁白提取 · 第一人称",
                    text: "你是专业漫剧旁白智能体，只做一件事：把用户输入的小说/文案，自动提炼成第一人称旁白。\n\n你的严格规则（必须全部遵守）\n\n\t1.\t只保留旁白：所有角色对话、引号内容、人物台词全部删除，一句不留。\n\n\t2.\t统一第一人称：全部改为「我」视角叙述，不能出现第三人称“他/她/男主/女主”。\n\n\t3.\t只留叙述：只保留环境描写、动作描写、心理活动、场景过渡、剧情推进。\n\n\t4.\t简洁不啰嗦：保留原意，删冗余修饰，句子短、适合配音朗读。\n\n\t5.\t不添加内容：不脑补、不续写、不加评论、不加情绪词。\n\n\t6.\t格式要求：\n\n\t○\t每段旁白单独成行\n\n\t○\t不要序号、不要标题、不要标注【旁白】\n\n\t○\t直接输出干净文本，方便复制到剪映朗读\n\n输出示例风格\n\n原文：她走进房间，看着窗外的雨，心里一阵不安。\n你输出：我走进房间，望着窗外的雨，心里不由得一阵不安。"
                }
            ]
        },
        {
            id: "character",
            name: "角色形象库",
            items: [
                {
                    title: "古风男1 · 暗黑极繁 · 黑夜花园",
                    text: "真人写实风格，极繁主义风格，古风，美男，，动态光影，俊美，冷峻，强对比度，暗黑风，氛围感，极致细节，冷白皮，面部特写，面部聚焦，面容精致，皮肤细腻，轮廓分明，丹凤眼，细致描绘，中景，半身像，正视图， 黑灰色及腰长发男子发丝根根分明，面容细腻渲染，发丝细腻渲染，近距离，皮肤细腻渲染。五官立体，男子面容俊美，身着黑色精致刺绣丝绸+珠光等材质服饰，黑金色金属头冠，极繁主义，超多配饰 背景黑夜花园"
                },
                {
                    title: "古风男2 · 妖冶薄纱 · 邪魅仰头",
                    text: "俊美男子，妖冶，真实人物，古风美男，冷白皮，单凤眼，眼尾细长，眼中含情，长发披散，漂亮的眼睛看向正前方，发丝细腻刻画，白色古风薄纱罩衣，金粉闪亮，带彩宝石首饰，项链，流苏，腰带，阳光从侧面打在他身上。黑发，微微仰头，唯美，氛围感。姿势合理，慵懒邪魅，绝美构图，背景古色古香，金，白为主，近距离，人物特写，画风暗黑，极致超清，极致细节。"
                },
                {
                    title: "古风男3 · 西装眼镜 · 阴湿疯批",
                    text: "帅哥，帅气男性高贵，疯批，阴湿，五官深邃立体，发丝柔和细腻有层次，冷白皮，皮肤细腻光滑，五官特写，正面， 面部特写细节，西装，领带，穿搭，高定，眼镜，明暗对比，光影投在人物身上，人物光影，故事感，背景透视感，空间感，立体感，最高画质，动感构图，大师级配色，大神级构图，场景感，氛围感强，32k超清晰，阴湿风，暗黑风，精致的画面，超高质量，大光圈，前景清晰背景模糊留白，精致妆容，最高画质，背景黑色，真人，温柔"
                },
                {
                    title: "古风男4 · CG建模 · 银发银饰",
                    text: "CG建模，古风帅哥，面部聚焦，人物特写，写实风格，冷白皮肤，光滑细腻，绝世容貌，妖冶阴柔，凤眼，清冷感，灰色发丝凌乱抚面，头发无冠无束，披着头发，华丽精致的头饰，发丝间有细碎银饰垂落，穿银白色，白色衣服，领口袖口精致华丽，有银丝和华丽装饰 氛围感，高级感，朦胧梦幻，协调"
                },
                {
                    title: "古风男5 · 少年感 · 桃花林",
                    text: "瓜子脸，亚洲面孔，少年。有着白皙细腻有光泽的肌肤渲染，3d动漫厚涂艺术人像特写，动态视角，温暖色调，光影艺术，唯美光影，半身像，魅力人像，创意，细腻光影，极简，高级感，梦核，朦胧感，模糊感，情感表达，独特视角，古风美男子，深色长发，浅色汉服，桃花林，光影交错，光影对比强烈，高质量极致细节，五官精致，光影斑驳，情绪氛围感，线条清晰，明暗对比，超高清，最高画质，清透，细腻渲染，丰富细节，眼神灵动精致厚涂，二次元拟真风格，超清画质，完美品质，弥散粒子，高级感，氛围感，梦幻光影，笔触感，精致刻画，流畅的线条，发丝细腻富有光泽，瓷白如玉的肌肤，笔触，清冷，高级CG，oc渲染，精致感，高质量，柔焦，大师级光影，8K"
                },
                {
                    title: "古风男6 · 全身像 · 腿长60%",
                    text: "古风（都市、末世） 美男 CG建模  冷白皮，俊美，动态光影，强对比度，暗黑风（温柔风），氛围感，极致细节，面部特写，面部聚焦，面容精致，皮肤细腻，轮廓分明，丹凤眼，细致描绘，全身像，正视图，腿长占身高60%，黑灰色及腰长发（发型）男子发丝根根分明，面容细腻渲染，发丝细腻渲染，近距离，皮肤细腻渲染。五官立体，男子面容俊美"
                },
                {
                    title: "古风男7 · 抹额邪魅 · 仰拍微距",
                    text: "古风帅哥，笔触，线条清晰，明暗对比，超高清，垂坠感，高级感，面部特写，最高画质，灰色长发，精美抹额，发丝蓬松，邪魅，狭长的双眼，极致妖孽的容貌，极致清冷感，精美繁复华丽装饰，华丽装饰，精美配饰，绝美眼睛，阴森，细节五官。丰富细节，微距镜头，面部阴影，面部聚焦，丰富的细节，凌乱发丝拂面，高质量，写实逼真，细腻肌理，仰拍视角，看向镜头， 笔触，线条清晰，明暗对比，超高清，垂坠感，高级感，最高画质，灰色长发，精美抹额，发丝蓬松，邪魅，极致清冷感，精美繁复华丽装饰，华丽装饰，精美配饰，绝美眼睛，阴森，细节五官。丰富细节，微距镜头，面部阴影，面部聚焦，丰富的细节，凌乱发丝拂面，高质量，写实逼真，细腻肌理，仰拍视角，看向镜头，全身照"
                },
                {
                    title: "古风男8 · BJD魔皇 · 魔殿",
                    text: "精细三维渲染，bjd，青年成人，古风男子，白灰色长头发，随意披散长发，厚重刘海，华丽的魔皇长袍和纹理，背景是魔殿，正面, 大景深, 全身镜头, 色差艳丽。图片风格为CG 厚涂"
                },
                {
                    title: "古风男9 · 侧颜杀 · 花瓣翻飞",
                    text: "3D古风美男，长发飘逸，眼神冷酷，五官立体，棱角分明，长发飘动，抬眼凝视，冷笑，侧颜杀，花瓣翻飞，4K高清，古典，半身像"
                },
                {
                    title: "古风女1 · 光点凝聚 · 破碎感",
                    text: "新三维古风，特写，3D，正面，近景，一位中式美女，她的身影仿佛由无数光点凝聚而成，散发着柔和的光芒。她的长发随风飘扬，半透轻纱的裙摆，有着镂空的银丝图案她的存在，如同梦境，既真实又虚幻，让人心驰神往。生物发光，破碎感。背景为黑色"
                },
                {
                    title: "古风女2 · 绝色倾城 · 落雪",
                    text: "3D仿真，特写，精致刻画，流畅的线条，梦幻感，绝色美女，倾国倾城，柔光，，梦幻光影，色彩弥漫，弥散光影，色彩弥散，极简风格，古风女子，华丽的发冠，黑发，下雪，4K，全身视角，半身视角"
                },
                {
                    title: "古风女3 · 暗夜微光 · 银发",
                    text: "三维古风，国风光影，移轴摄影，古风美女，暗夜微光，暗黑魔幻，流体艺术，超长飘发，蓬松闪亮的细密银色长发，精致艳丽的妆容，她身披黑白色披风连衣帽，额头小印花，黑色系主题，古风，HDR，3D渲染，虚拟引擎渲染，高清，8K"
                },
                {
                    title: "古风女4 · 清冷孤寂 · 远景全身",
                    text: "远景镜头，全身都在画面里，板绘插画，cg建模，妖冶美丽，面容精致，五官立体 黑灰色及腰蓬松超长发松束半扎，自然垂落长长刘海凌乱拂面，发丝蓬松带清透光泽，几缕碎发被夜风掀起。 冷白皮肤细腻发光，面部轮廓柔和，凤眼，瞳仁深不见底，正望向镜头，睫毛在眼下投出浅淡阴影。眼神淡漠。清冷，孤寂，生人勿近，矜贵清冷，女生"
                },
                {
                    title: "古风女5 · 小香风 · 厚涂32K",
                    text: "一个长发美女，小香风，全身照特写，眼看镜头，光线柔和 数字艺术风格 厚涂插画 3D渲染 新工笔大师杰作 32k 超高清画质"
                },
                {
                    title: "古风女6 · 九头身 · 神秘幻境",
                    text: "三维古风。3d，服饰，美女，冷白皮，身材高挑 发钗，头饰，高质量，高分辨率，神秘，幻境，杰作，大师级构图，半身视角 全身像，完整四肢可见，从头顶到脚尖完整构图，背景留白，九头身，黄金比例身材，腿长占身高60%，专业打光，高清细节"
                }
            ]
        }
    ];

    var STORAGE_KEY = 'dbp.prompt.groups';

    var groups = [];
    var activeGroup = '';
    var keyword = '';
    var pendingDelete = -1;
    var pendingButton = null;
    var editingIndex = -1;

    function loadGroups() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                var parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length) return parsed;
            }
        } catch (error) {
            /* 读取失败时回退到内置库 */
        }
        return DEFAULT_GROUPS;
    }

    function saveGroups(next) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (error) {
            /* 忽略写入失败 */
        }
    }

    /* ---------------- 图标 ---------------- */

    var icon = function (name) {
        var paths = {
            library:
                '<path d="m16 6 4 14H4L8 6"/><path d="M8 6h8"/><path d="M9 2h6l1 4H8l1-4Z"/><path d="m10 11 2 2 2-2"/>',
            close: '<path d="m18 6-12 12"/><path d="m6 6 12 12"/>',
            chevron: '<path d="m6 9 6 6 6-6"/>',
            tick: '<path d="m20 6-11 11-5-5"/>'
        };
        return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (paths[name] || '') + '</svg>';
    };

    /* ---------------- 工具函数 ---------------- */

    /* 超长提示词（如分镜脚本 5000+ 字）直接挂 title 会拖慢渲染且无法阅读，截断为预览 */
    var previewText = function (text, max) {
        var flat = String(text == null ? '' : text).replace(/\s+/g, ' ').trim();
        if (flat.length <= max) return flat;
        return flat.slice(0, max) + '…（全文 ' + flat.length + ' 字，点「修改」查看完整内容）';
    };

    var escapeHtml = function (value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };

    var isVisible = function (element) {
        if (!element || !element.isConnected) return false;
        var style = getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
        var rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0;
    };

    /* ---------------- 输入框操作：只填入，不发送 ---------------- */

    var findComposer = function () {
        var candidates = [
            'div[data-slate-editor="true"]',
            '[contenteditable="true"][data-placeholder]',
            'textarea[placeholder]',
            '[contenteditable="true"][role="textbox"]',
            'div[contenteditable="true"]',
            'textarea'
        ];
        var found = candidates.reduce(function (all, selector) {
            return all.concat(Array.prototype.slice.call(document.querySelectorAll(selector)));
        }, []);
        /* 排除面板自身的编辑框，否则编辑时会把提示词填进自己 */
        found = found.filter(function (element) {
            return !root.contains(element);
        });
        return (
            found.filter(isVisible)[0] ||
            found[0] ||
            null
        );
    };

    var setComposerText = function (composer, text) {
        composer.focus();
        if (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement) {
            var proto = composer instanceof HTMLTextAreaElement
                ? HTMLTextAreaElement.prototype
                : HTMLInputElement.prototype;
            var setter = Object.getOwnPropertyDescriptor(proto, 'value');
            if (setter && setter.set) setter.set.call(composer, text);
            else composer.value = text;
            composer.dispatchEvent(new Event('input', { bubbles: true }));
            composer.dispatchEvent(new Event('change', { bubbles: true }));
            return;
        }
        var inserted = false;
        try {
            document.execCommand('selectAll', false, null);
            inserted = document.execCommand('insertText', false, text);
        } catch (error) {
            inserted = false;
        }
        if (!inserted) {
            composer.textContent = text;
            try {
                var range = document.createRange();
                range.selectNodeContents(composer);
                range.collapse(false);
                var selection = window.getSelection();
                if (selection) {
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            } catch (error) {
                /* 光标回退失败可忽略 */
            }
        }
        composer.dispatchEvent(
            new InputEvent('input', { bubbles: true, data: text, inputType: 'insertText' })
        );
    };

    var fillComposer = function (text) {
        var composer = findComposer();
        if (!composer) throw new Error('未找到输入框，请先打开豆包对话页');
        setComposerText(composer, text);
        return composer;
    };

    /* ---------------- 面板 ---------------- */

    var root = document.createElement('div');
    root.id = 'dbp-workspace';
    root.innerHTML =
        `<style>#dbp-workspace, #dbp-workspace * { box-sizing: border-box; letter-spacing: 0; }
                #dbp-workspace { --dbp-glass: rgba(255, 255, 255, .06); --dbp-glass-2: rgba(255, 255, 255, .1); --dbp-stroke: rgba(255, 255, 255, .09); --dbp-text: #f5f5f7; --dbp-text-2: rgba(235, 235, 245, .62); --dbp-text-3: rgba(235, 235, 245, .34); --dbp-green: #30d158; --dbp-blur: blur(24px) saturate(180%); --dbp-ease: cubic-bezier(.32, .72, 0, 1); }
                #dbp-launcher-host { position: fixed; right: 20px; bottom: 84px; z-index: 2147483645; }
                #dbp-launcher-btn { position: relative; min-width: 128px; height: 48px; display: flex; align-items: center; gap: 10px; padding: 0 18px 0 15px; border: 1px solid rgba(255, 255, 255, .9); border-radius: 24px; color: #14151a; background: linear-gradient(150deg, #ffffff, #ececf1); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); box-shadow: 0 10px 32px rgba(0, 0, 0, .4), 0 6px 22px rgba(0, 0, 0, .28), inset 0 1px 0 rgba(255, 255, 255, .9); cursor: pointer; font: 600 13px/1 -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif; transition: transform .22s var(--dbp-ease), box-shadow .22s var(--dbp-ease), opacity .22s var(--dbp-ease); }
                #dbp-launcher-btn[hidden] { display: none !important; }
                #dbp-launcher-btn:hover { transform: translateY(-1px); box-shadow: 0 14px 38px rgba(0, 0, 0, .48), 0 8px 26px rgba(0, 0, 0, .3), inset 0 1px 0 rgba(255, 255, 255, .9); }
                #dbp-launcher-btn:active { transform: scale(.97); opacity: .9; }
                #dbp-launcher-btn svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
                .dbp-launcher-copy { display: grid; gap: 3px; text-align: left; }
                .dbp-launcher-name { white-space: nowrap; }
                .dbp-launcher-kind { color: rgba(20, 21, 26, .58); font-size: 10px; font-weight: 600; }
                #dbp-panel { position: fixed; z-index: 2147483644; top: 14px; right: 14px; bottom: 14px; width: min(420px, calc(100vw - 28px)); display: grid; grid-template-rows: auto auto auto minmax(0, 1fr); overflow: hidden; border: 1px solid rgba(255, 255, 255, .1); border-radius: 24px; color: var(--dbp-text); background: linear-gradient(165deg, rgba(28, 28, 32, .82), rgba(10, 10, 14, .88)); backdrop-filter: blur(30px) saturate(190%); -webkit-backdrop-filter: blur(30px) saturate(190%); box-shadow: 0 28px 80px rgba(0, 0, 0, .55), inset 0 1px 0 rgba(255, 255, 255, .1); font: 13px/1.45 -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif; -webkit-font-smoothing: antialiased; transform: translateX(calc(100% + 32px)); visibility: hidden; transition: transform .38s var(--dbp-ease), visibility .38s; }
                #dbp-panel::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(340px 220px at 12% -6%, rgba(255, 255, 255, .22), transparent 65%), radial-gradient(300px 220px at 106% 104%, rgba(255, 255, 255, .1), transparent 65%), linear-gradient(180deg, rgba(255, 255, 255, .16) 0%, rgba(255, 255, 255, .05) 28%, transparent 52%); }
                #dbp-panel > * { position: relative; }
                #dbp-panel[data-open="true"] { transform: translateX(0); visibility: visible; }
                .dbp-head { min-height: 60px; display: flex; align-items: center; gap: 10px; margin: 10px 10px 0; padding: 0 10px 0 16px; border: 1px solid var(--dbp-stroke); border-radius: 18px; background: linear-gradient(180deg, rgba(255, 255, 255, .16), rgba(255, 255, 255, .05) 62%, rgba(255, 255, 255, .03)); backdrop-filter: var(--dbp-blur); -webkit-backdrop-filter: var(--dbp-blur); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .14); }
                .dbp-brand { min-width: 0; flex: 1; }
                .dbp-title { font-size: 16px; font-weight: 700; letter-spacing: -.01em; color: var(--dbp-text); }
                .dbp-summary { margin-top: 1px; color: var(--dbp-text-3); font-size: 11px; }
                .dbp-icon-btn { width: 32px; height: 32px; display: grid; place-items: center; padding: 0; border: 1px solid transparent; border-radius: 50%; color: var(--dbp-text-2); background: rgba(255, 255, 255, .07); cursor: pointer; transition: opacity .18s var(--dbp-ease), background .18s var(--dbp-ease), color .18s var(--dbp-ease); }
                .dbp-icon-btn:hover { color: var(--dbp-text); background: rgba(255, 255, 255, .15); }
                .dbp-icon-btn:active { opacity: .7; }
                .dbp-icon-btn svg, .dbp-button svg, .dbp-tab svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
                .dbp-tools { display: flex; align-items: center; gap: 8px; margin: 10px 10px 0; }
                .dbp-search { flex: 1; min-width: 0; }
                .dbp-add-btn { flex: none; height: 34px; padding: 0 18px; border: 1px solid rgba(255, 255, 255, .9); border-radius: 11px; color: #14151a; background: linear-gradient(160deg, #ffffff, #ececf1); font-size: 13px; font-weight: 600; line-height: 1; white-space: nowrap; cursor: pointer; box-shadow: 0 7px 20px rgba(0, 0, 0, .36); transition: opacity .18s var(--dbp-ease), transform .18s var(--dbp-ease); }
                .dbp-add-btn:hover { opacity: .88; }
                .dbp-add-btn:active { transform: scale(.96); opacity: .8; }
                .dbp-tabs { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin: 10px; padding: 3px; border: 1px solid var(--dbp-stroke); border-radius: 13px; background: rgba(255, 255, 255, .05); backdrop-filter: var(--dbp-blur); -webkit-backdrop-filter: var(--dbp-blur); }
                .dbp-tab { position: relative; height: 32px; display: flex; align-items: center; justify-content: center; gap: 6px; border: 0; border-radius: 10px; color: var(--dbp-text-2); background: transparent; font-size: 12.5px; font-weight: 600; line-height: 1; cursor: pointer; transition: background .22s var(--dbp-ease), color .22s var(--dbp-ease), box-shadow .22s var(--dbp-ease); }
                .dbp-tab:hover { color: var(--dbp-text); }
                .dbp-tab.active { color: var(--dbp-text); background: rgba(255, 255, 255, .13); box-shadow: 0 1px 3px rgba(0, 0, 0, .3), inset 0 1px 0 rgba(255, 255, 255, .1); }
                .dbp-tab.active::after { display: none; }
                .dbp-tab-count { min-width: 18px; padding: 1px 5px; border-radius: 8px; color: var(--dbp-text-2); background: rgba(255, 255, 255, .12); font-size: 10px; font-weight: 600; }
                .dbp-list { overflow: auto; padding: 2px 10px 14px; background: transparent; transition: opacity .2s var(--dbp-ease); }
                .dbp-list { scrollbar-gutter: stable; scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, .26) rgba(255, 255, 255, .05); }
                .dbp-list::-webkit-scrollbar { width: 8px; }
                .dbp-list::-webkit-scrollbar-track { margin: 2px 0 12px; border-radius: 99px; background: rgba(255, 255, 255, .05); box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, .07), inset 0 1px 3px rgba(0, 0, 0, .25); }
                .dbp-list::-webkit-scrollbar-thumb { border: 0; border-radius: 99px; background: linear-gradient(180deg, rgba(255, 255, 255, .36), rgba(255, 255, 255, .2)); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .45), inset 0 0 0 .5px rgba(255, 255, 255, .18), 0 2px 8px rgba(0, 0, 0, .3); transition: background .2s var(--dbp-ease); }
                .dbp-list::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, rgba(255, 255, 255, .52), rgba(255, 255, 255, .34)); }
                .dbp-list::-webkit-scrollbar-thumb:active { background: linear-gradient(180deg, rgba(255, 255, 255, .66), rgba(255, 255, 255, .48)); }
                .dbp-list::-webkit-scrollbar-corner { background: transparent; }
                .dbp-item { display: grid; grid-template-columns: minmax(0, 1fr) 48px; gap: 10px; align-items: stretch; min-height: 104px; margin-bottom: 10px; padding: 10px; border: 1px solid var(--dbp-stroke); border-radius: 18px; background: var(--dbp-glass); backdrop-filter: var(--dbp-blur); -webkit-backdrop-filter: var(--dbp-blur); box-shadow: 0 6px 20px rgba(0, 0, 0, .3), inset 0 1px 0 rgba(255, 255, 255, .07); transition: transform .2s var(--dbp-ease), border-color .2s var(--dbp-ease), background .2s var(--dbp-ease); }
                .dbp-item:hover { transform: translateY(-1px); background: var(--dbp-glass-2); }
                .dbp-item.editing:hover { transform: none; background: var(--dbp-glass); }
                .dbp-item-body { min-width: 0; display: flex; flex-direction: column; }
                .dbp-item-title { overflow: hidden; color: var(--dbp-text); font-size: 15px; font-weight: 600; letter-spacing: -.01em; text-overflow: ellipsis; white-space: nowrap; }
                .dbp-button { height: 32px; flex: none; display: inline-flex; align-items: center; justify-content: center; gap: 5px; padding: 0 13px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 9px; color: rgba(240, 248, 255, .95); background: rgba(255, 255, 255, .08); font-size: 12px; font-weight: 600; line-height: 1; white-space: nowrap; cursor: pointer; transition: background .18s var(--dbp-ease), opacity .18s var(--dbp-ease); }
                .dbp-button:hover { background: rgba(255, 255, 255, .18); }
                .dbp-button:active { opacity: .62; }
                /* 全选 / 取消全选 文字长度不同，锁定最小宽度避免切换时按钮与状态文字被挤压抖动 */
                .dbp-empty { height: 100%; min-height: 180px; display: grid; place-content: center; justify-items: center; gap: 3px; color: var(--dbp-text-3); text-align: center; }
                .dbp-empty svg { width: 38px; height: 38px; margin-bottom: 8px; fill: none; stroke: rgba(235, 235, 245, .22); stroke-width: 1.3; }
                .dbp-empty strong { color: var(--dbp-text-2); font-size: 13px; font-weight: 600; }
                .dbp-empty span { margin-top: 2px; font-size: 11px; }
                @media (max-width: 520px) { #dbp-panel { inset: 0; width: 100%; border: 0; border-radius: 0; } .dbp-head, .dbp-tools { margin-left: 8px; margin-right: 8px; } }

                .dbp-index { display: grid; place-items: center; align-content: center; gap: 2px; min-height: 62px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 13px; background: linear-gradient(160deg, rgba(255, 255, 255, .18), rgba(255, 255, 255, .05)); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .12); color: #fff; font-size: 22px; font-weight: 700; letter-spacing: -.02em; }
                .dbp-index small { display: block; color: rgba(235, 235, 245, .45); font-size: 8.5px; font-weight: 700; letter-spacing: .12em; }
                .dbp-item-text { margin-top: 5px; color: var(--dbp-text-2); font-size: 12px; line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
                .dbp-item.has-index { grid-template-columns: 62px minmax(0, 1fr) 48px; }
                .dbp-item.editing { grid-template-columns: minmax(0, 1fr); }
                .dbp-side { display: grid; grid-template-rows: repeat(3, minmax(30px, 1fr)); grid-auto-rows: minmax(30px, auto); gap: 5px; }
                .dbp-side-btn { display: grid; place-items: center; min-height: 30px; padding: 0; border: 1px solid rgba(255, 255, 255, .1); border-radius: 11px; color: var(--dbp-text-2); background: rgba(255, 255, 255, .08); cursor: pointer; font-size: 12px; font-weight: 600; line-height: 1; letter-spacing: .02em; transition: background .18s var(--dbp-ease), color .18s var(--dbp-ease), border-color .18s var(--dbp-ease); }
                .dbp-side-btn:hover { color: var(--dbp-text); background: rgba(255, 255, 255, .18); }
                .dbp-side-btn:active { opacity: .62; }
                .dbp-side-btn[data-action="del"]:hover { color: #ff7a7a; border-color: rgba(255, 122, 122, .4); background: rgba(255, 122, 122, .12); }
                .dbp-side-btn.confirm, .dbp-side-btn.confirm:hover { color: #ff7a7a; border-color: rgba(255, 122, 122, .75); background: rgba(255, 122, 122, .22); }
                .dbp-side-btn.done, .dbp-side-btn.done:hover { color: #30d158; border-color: rgba(48, 209, 88, .65); background: rgba(48, 209, 88, .18); }
                .dbp-side-btn.confirm { color: #ff7a7a; border-color: rgba(255, 122, 122, .6); background: rgba(255, 122, 122, .18); }
                .dbp-side-btn.done { color: #30d158; border-color: rgba(48, 209, 88, .5); background: rgba(48, 209, 88, .14); }
                .dbp-edit { display: grid; gap: 6px; }
                .dbp-edit input, .dbp-edit textarea { width: 100%; padding: 7px 9px; border: 1px solid var(--dbp-stroke); border-radius: 9px; color: var(--dbp-text); background: rgba(255, 255, 255, .07); font-size: 12px; font-weight: 500; line-height: 1.5; outline: none; resize: vertical; transition: border-color .18s var(--dbp-ease), background .18s var(--dbp-ease); }
                .dbp-edit input:focus, .dbp-edit textarea:focus { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .11); }
                .dbp-edit textarea { min-height: 96px; max-height: 340px; }
                .dbp-edit-row { display: flex; gap: 6px; }
                .dbp-edit-row .dbp-button { flex: 1; }
                .dbp-picker { position: relative; }
                .dbp-picker-trigger { width: 100%; height: 32px; display: flex; align-items: center; gap: 8px; padding: 0 10px 0 11px; border: 1px solid var(--dbp-stroke); border-radius: 9px; color: var(--dbp-text); background: rgba(255, 255, 255, .07); font-size: 12px; font-weight: 500; line-height: 1; cursor: pointer; outline: none; transition: border-color .18s var(--dbp-ease), background .18s var(--dbp-ease); }
                .dbp-picker-trigger:hover { background: rgba(255, 255, 255, .11); }
                .dbp-picker-trigger:focus, .dbp-picker-trigger[aria-expanded="true"] { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .11); }
                .dbp-picker-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; }
                .dbp-picker-caret { flex: none; display: grid; place-items: center; color: var(--dbp-text-2); transition: transform .2s var(--dbp-ease); }
                .dbp-picker-caret svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
                .dbp-picker-trigger[aria-expanded="true"] .dbp-picker-caret { transform: rotate(180deg); color: var(--dbp-text); }
                .dbp-picker-menu { position: absolute; z-index: 5; top: calc(100% + 5px); left: 0; right: 0; max-height: 190px; overflow: auto; padding: 4px; border: 1px solid rgba(255, 255, 255, .14); border-radius: 12px; background: linear-gradient(165deg, rgba(46, 46, 52, .96), rgba(22, 22, 28, .98)); backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%); box-shadow: 0 16px 40px rgba(0, 0, 0, .55), inset 0 1px 0 rgba(255, 255, 255, .12); opacity: 0; visibility: hidden; transform: translateY(-4px) scale(.98); transform-origin: top center; transition: opacity .18s var(--dbp-ease), transform .18s var(--dbp-ease), visibility .18s; scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, .24) transparent; }
                .dbp-picker[data-open="true"] .dbp-picker-menu { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }
                .dbp-picker-menu::-webkit-scrollbar { width: 6px; }
                .dbp-picker-menu::-webkit-scrollbar-thumb { border-radius: 99px; background: rgba(255, 255, 255, .24); }
                .dbp-picker-opt { width: 100%; min-height: 32px; display: flex; align-items: center; gap: 8px; padding: 0 9px; border: 0; border-radius: 8px; color: var(--dbp-text-2); background: transparent; font-size: 12px; font-weight: 500; line-height: 1; text-align: left; cursor: pointer; transition: background .14s var(--dbp-ease), color .14s var(--dbp-ease); }
                .dbp-picker-opt:hover { color: var(--dbp-text); background: rgba(255, 255, 255, .12); }
                .dbp-picker-opt[aria-selected="true"] { color: var(--dbp-text); background: rgba(255, 255, 255, .1); }
                .dbp-picker-opt-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .dbp-picker-opt-count { flex: none; padding: 1px 5px; border-radius: 7px; color: var(--dbp-text-3); background: rgba(255, 255, 255, .1); font-size: 10px; font-weight: 600; }
                .dbp-picker-opt svg { flex: none; width: 13px; height: 13px; fill: none; stroke: var(--dbp-green); stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
                .dbp-picker-opt:not([aria-selected="true"]) svg { visibility: hidden; }
                .dbp-new { margin-bottom: 10px; padding: 10px; border: 1px dashed rgba(255, 255, 255, .28); border-radius: 18px; background: rgba(255, 255, 255, .05); }
                .dbp-save { color: #14151a; border-color: rgba(255, 255, 255, .9); background: linear-gradient(160deg, #ffffff, #ececf1); transition: filter .18s var(--dbp-ease), transform .18s var(--dbp-ease); }
                .dbp-save:hover { color: #14151a; background: linear-gradient(160deg, #ffffff, #dcdce2); filter: brightness(1.06); }
                .dbp-save:active { color: #14151a; background: linear-gradient(160deg, #ececf1, #d5d5db); transform: scale(.97); opacity: 1; }
                .dbp-search { height: 34px; padding: 0 13px; border: 1px solid var(--dbp-stroke); border-radius: 11px; color: var(--dbp-text); background: rgba(255, 255, 255, .07); font-size: 12px; font-weight: 500; line-height: 1; outline: none; transition: border-color .18s var(--dbp-ease), background .18s var(--dbp-ease); }
                .dbp-search::placeholder { color: var(--dbp-text-3); }
                .dbp-search:focus { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .11); }
</style>` +
        '<div id="dbp-launcher-host">' +
        '<button id="dbp-launcher-btn" type="button" aria-label="打开豆包指令库" title="打开豆包指令库">' +
        icon('library') +
        '<span class="dbp-launcher-copy"><span class="dbp-launcher-name">豆包指令库</span><span class="dbp-launcher-kind">PromptKit</span></span>' +
        '</button>' +
        '</div>' +
        '<aside id="dbp-panel" data-open="false" aria-label="豆包指令库面板">' +
        '<header class="dbp-head">' +
        '<div class="dbp-brand"><div class="dbp-title">豆包指令库</div><div class="dbp-summary">PromptKit</div></div>' +
        '<button class="dbp-icon-btn" data-action="close" title="关闭" aria-label="关闭">' +
        icon('close') +
        '</button>' +
        '</header>' +
        '<section class="dbp-tools">' +
        '<input class="dbp-search" type="search" placeholder="搜索提示词…" aria-label="搜索提示词">' +
        '<button class="dbp-add-btn" data-action="add" title="新增提示词">新增</button>' +
        '</section>' +
        '<nav class="dbp-tabs" aria-label="提示词分组"></nav>' +
        '<main class="dbp-list"></main>' +

        '</aside>';
    document.body.appendChild(root);

    var launcher = root.querySelector('#dbp-launcher-btn');
    var panel = root.querySelector('#dbp-panel');
    var tabs = root.querySelector('.dbp-tabs');
    var list = root.querySelector('.dbp-list');
    var search = root.querySelector('.dbp-search');

    launcher.hidden = false;

    var activeGroupData = function () {
        return (
            groups.filter(function (item) {
                return item.id === activeGroup;
            })[0] || null
        );
    };

    var currentItems = function () {
        var group = activeGroupData();
        if (!group) return [];
        var kw = keyword.trim().toLowerCase();
        var matched = group.items
            .map(function (item, index) {
                return { item: item, index: index };
            })
            .filter(function (entry) {
                if (!kw) return true;
                return (
                    (entry.item.title || '').toLowerCase().indexOf(kw) >= 0 ||
                    (entry.item.text || '').toLowerCase().indexOf(kw) >= 0
                );
            });
        if (!kw) return matched;
        /* 标题命中的排在前面：长提示词正文里几乎什么词都有，仅正文命中多为噪音 */
        return matched.sort(function (a, b) {
            var at = (a.item.title || '').toLowerCase().indexOf(kw) >= 0 ? 0 : 1;
            var bt = (b.item.title || '').toLowerCase().indexOf(kw) >= 0 ? 0 : 1;
            return at - bt;
        });
    };

    var sideButton = function (action, label, index) {
        return (
            '<button class="dbp-side-btn" data-action="' +
            action +
            '" data-index="' +
            index +
            '" title="' +
            label +
            '">' +
            label +
            '</button>'
        );
    };

    var render = function () {
        clearDeletePending();
        editingIndex = -1;
        closePickers();
        var group = activeGroupData();
        tabs.innerHTML = groups
            .map(function (item) {
                return (
                    '<button class="dbp-tab' +
                    (item.id === activeGroup ? ' active' : '') +
                    '" data-tab="' +
                    escapeHtml(item.id) +
                    '">' +
                    escapeHtml(item.name) +
                    ' <span class="dbp-tab-count">' +
                    item.items.length +
                    '</span></button>'
                );
            })
            .join('');
        tabs.style.gridTemplateColumns = 'repeat(' + Math.max(groups.length, 1) + ', 1fr)';

        var entries = currentItems();
        if (!entries.length) {
            list.innerHTML =
                '<div class="dbp-empty">' +
                icon('library') +
                '<strong>没有匹配的提示词</strong><span>' +
                (keyword ? '换个关键词试试' : '该分组下暂无提示词') +
                '</span></div>';
            return;
        }

        var ordered = Boolean(group && group.ordered);
        list.innerHTML = entries
            .map(function (entry, position) {
                var item = entry.item;
                var index = entry.index;
                var seq = ordered
                    ? '<div class="dbp-index">' +
                      String(position + 1).padStart(2, '0') +
                      '<small>STEP</small></div>'
                    : '';
                return (
                    '<article class="dbp-item' +
                    (ordered ? ' has-index' : '') +
                    '" data-index="' +
                    index +
                    '">' +
                    seq +
                    '<div class="dbp-item-body">' +
                    '<div class="dbp-item-title">' +
                    escapeHtml(item.title) +
                    '</div>' +
                    '<div class="dbp-item-text" title="' +
                    escapeHtml(previewText(item.text, 160)) +
                    '">' +
                    escapeHtml(item.text) +
                    '</div>' +
                    '</div>' +
                    '<div class="dbp-side">' +
                    sideButton('edit', '修改', index) +
                    sideButton('del', '删除', index) +
                    sideButton('fill-one', '输入', index) +
                    '</div>' +
                    '</article>'
                );
            })
            .join('');
    };

    var flashSide = function (button, label, tone) {
        if (!button) return;
        var original = button.dataset.label || button.textContent;
        button.dataset.label = original;
        button.textContent = label;
        button.classList.add(tone === 'danger' ? 'confirm' : 'done');
        setTimeout(function () {
            button.classList.remove('confirm', 'done');
            /* 删除确认态由 clearDeletePending 单独管理，不在此复原 */
            if (!button.isConnected) return;
            button.textContent = original;
        }, 1100);
    };

    /* 删除确认态：无超时，只能被显式取消，避免点慢了永远删不掉 */
    var setDeletePending = function (button, index) {
        clearDeletePending();
        pendingDelete = index;
        pendingButton = button;
        button.dataset.label = button.dataset.label || button.textContent;
        button.textContent = '确认';
        button.classList.add('confirm');
    };

    var clearDeletePending = function () {
        if (pendingButton && pendingButton.isConnected) {
            pendingButton.classList.remove('confirm');
            if (pendingButton.dataset.label) pendingButton.textContent = pendingButton.dataset.label;
        }
        pendingDelete = -1;
        pendingButton = null;
    };

    var itemAt = function (index) {
        var group = activeGroupData();
        if (!group) return null;
        return group.items[index] || null;
    };

    var writeGroup = function () {
        saveGroups(groups);
    };

    var closePickers = function () {
        Array.prototype.forEach.call(root.querySelectorAll('.dbp-picker'), function (picker) {
            picker.dataset.open = 'false';
            var trigger = picker.querySelector('.dbp-picker-trigger');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
    };

    var startAdd = function () {
        var article = list.querySelector('.dbp-new');
        if (article) {
            render();
            return;
        }
        /* 有卡片处于编辑态时先复位，避免编辑表单与新增表单并存 */
        if (editingIndex >= 0) render();
        var wrap = document.createElement('article');
        wrap.className = 'dbp-new';
        wrap.innerHTML =
            '<div class="dbp-edit">' +
            '<input type="text" data-role="new-title" placeholder="提示词标题">' +
            '<textarea data-role="new-text" placeholder="提示词内容"></textarea>' +
            '<div class="dbp-picker" data-role="new-group" data-value="' +
            escapeHtml(activeGroup) +
            '">' +
            '<button type="button" class="dbp-picker-trigger" data-action="picker-toggle" aria-expanded="false" aria-haspopup="listbox">' +
            '<span class="dbp-picker-label">' +
            escapeHtml((activeGroupData() || {}).name || '选择分类') +
            '</span>' +
            '<span class="dbp-picker-caret">' +
            icon('chevron') +
            '</span>' +
            '</button>' +
            '<div class="dbp-picker-menu" role="listbox" aria-label="选择分类">' +
            groups
                .map(function (item) {
                    return (
                        '<button type="button" class="dbp-picker-opt" role="option" data-action="picker-pick" data-value="' +
                        escapeHtml(item.id) +
                        '" aria-selected="' +
                        (item.id === activeGroup ? 'true' : 'false') +
                        '">' +
                        '<span class="dbp-picker-opt-text">' +
                        escapeHtml(item.name) +
                        '</span>' +
                        '<span class="dbp-picker-opt-count">' +
                        item.items.length +
                        '</span>' +
                        icon('tick') +
                        '</button>'
                    );
                })
                .join('') +
            '</div>' +
            '</div>' +
            '<div class="dbp-edit-row">' +
            '<button class="dbp-button" data-action="add-cancel">取消</button>' +
            '<button class="dbp-button dbp-save" data-action="add-save">保存</button>' +
            '</div>' +
            '</div>';
        list.insertBefore(wrap, list.firstChild);
        var input = wrap.querySelector('[data-role="new-title"]');
        if (input) input.focus();
        if (list.scrollTop > 0) list.scrollTop = 0;
    };

    var saveAdd = function () {
        var wrap = list.querySelector('.dbp-new');
        if (!wrap) return;
        var titleInput = wrap.querySelector('[data-role="new-title"]');
        var textInput = wrap.querySelector('[data-role="new-text"]');
        var picker = wrap.querySelector('[data-role="new-group"]');
        if (!titleInput || !textInput || !picker) {
            render();
            return;
        }
        var title = (titleInput.value || '').trim();
        var text = textInput.value || '';
        var groupId = picker.dataset.value;
        if (!title && !text.trim()) {
            render();
            return;
        }
        var group = groups.filter(function (item) {
            return item.id === groupId;
        })[0];
        if (!group) group = activeGroupData();
        if (!group) return;
        group.items.push({ title: title || '未命名提示词', text: text });
        writeGroup();
        /* 新增后跳到目标分组并清掉搜索，确保能看到刚加的那条 */
        activeGroup = group.id;
        keyword = '';
        search.value = '';
        render();
        if (list.scrollTop !== undefined) list.scrollTop = list.scrollHeight;
    };

    var startEdit = function (index) {
        var item = itemAt(index);
        if (!item) return;
        /* 已有其他卡片处于编辑态时先复位，避免同时出现多个表单导致未保存内容丢失 */
        if (editingIndex >= 0 && editingIndex !== index) render();
        var article = list.querySelector('.dbp-item[data-index="' + index + '"]');
        if (!article) return;
        editingIndex = index;
        article.classList.remove('has-index');
        article.classList.add('editing');
        article.innerHTML =
            '<div class="dbp-edit">' +
            '<input type="text" data-role="title" value="' +
            escapeHtml(item.title) +
            '" placeholder="步骤标题">' +
            '<textarea data-role="text" placeholder="提示词内容">\n' +
            escapeHtml(item.text) +
            '</textarea>' +
            '<div class="dbp-edit-row">' +
            '<button class="dbp-button" data-action="edit-cancel">取消</button>' +
            '<button class="dbp-button dbp-save" data-action="edit-save" data-index="' +
            index +
            '">保存</button>' +
            '</div>' +
            '</div>';
        var input = article.querySelector('[data-role="title"]');
        if (input) input.focus();
    };

    var saveEdit = function (index) {
        var article = list.querySelector('.dbp-item[data-index="' + index + '"]');
        var item = itemAt(index);
        if (!article || !item) return;
        editingIndex = -1;
        var titleInput = article.querySelector('[data-role="title"]');
        var textInput = article.querySelector('[data-role="text"]');
        if (!titleInput || !textInput) {
            render();
            return;
        }
        var title = (titleInput.value || '').trim();
        var text = textInput.value || '';
        if (!title && !text.trim()) {
            render();
            return;
        }
        item.title = title || '未命名步骤';
        item.text = text;
        writeGroup();
        render();
    };

    var removeItem = function (index) {
        var group = activeGroupData();
        if (!group) return;
        group.items.splice(index, 1);
        writeGroup();
        render();
    };

    var resetToDefault = function () {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            /* 忽略 */
        }
        groups = JSON.parse(JSON.stringify(DEFAULT_GROUPS));
        if (!groups.some(function (item) {
            return item.id === activeGroup;
        })) {
            activeGroup = groups[0].id;
        }
        keyword = '';
        search.value = '';
        render();
    };

    var reload = function () {
        groups = loadGroups();
        if (!groups.some(function (item) {
            return item.id === activeGroup;
        })) {
            activeGroup = groups[0].id;
        }
        render();
    };

    var closePanel = function () {
        panel.dataset.open = 'false';
        launcher.hidden = false;
        clearDeletePending();
    };

    /* ---------------- 事件 ---------------- */

    launcher.addEventListener('click', function () {
        panel.dataset.open = 'true';
        launcher.hidden = true;
        reload();
    });

    document.addEventListener('pointerdown', function (event) {
        if (panel.dataset.open !== 'true') return;
        var target = event.target;
        if (!(target instanceof Node)) return;
        if (panel.contains(target)) {
            /* 点在面板内但不在下拉上 → 收起下拉 */
            if (!target.closest || !target.closest('.dbp-picker')) closePickers();
            /* 点侧栏按钮以外的区域 → 取消删除确认态 */
            if (!target.closest || !target.closest('.dbp-side')) clearDeletePending();
            return;
        }
        if (launcher.contains(target)) return;
        /* 编辑或新增进行中，不因点击页面而关闭，避免未保存内容丢失（用 Esc / 取消退出） */
        if (editingIndex >= 0 || list.querySelector('.dbp-new')) return;
        closePanel();
    });

    search.addEventListener('input', function () {
        keyword = search.value;
        clearDeletePending();
        render();
    });

    tabs.addEventListener('click', function (event) {
        var tab = event.target.closest('[data-tab]');
        if (!tab) return;
        activeGroup = tab.dataset.tab;
        keyword = '';
        clearDeletePending();
        search.value = '';
        render();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        if (panel.dataset.open !== 'true') return;
        var openPicker = root.querySelector('.dbp-picker[data-open="true"]');
        if (openPicker) {
            event.stopPropagation();
            closePickers();
            return;
        }
        if (editingIndex >= 0 || list.querySelector('.dbp-new')) {
            event.stopPropagation();
            render();
            return;
        }
        closePanel();
    });

    list.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' || !(event.ctrlKey || event.metaKey)) return;
        if (editingIndex >= 0) {
            event.preventDefault();
            saveEdit(editingIndex);
            return;
        }
        if (list.querySelector('.dbp-new')) {
            event.preventDefault();
            saveAdd();
        }
    });

    root.addEventListener('click', function (event) {
        var target = event.target.closest('[data-action]');
        if (!target) return;
        var action = target.dataset.action;
        if (action !== 'del' && pendingButton) clearDeletePending();

        if (action === 'close') {
            closePanel();
            return;
        }

        if (action === 'picker-toggle') {
            var picker = target.closest('.dbp-picker');
            if (!picker) return;
            var open = picker.dataset.open === 'true';
            closePickers();
            if (!open) {
                picker.dataset.open = 'true';
                target.setAttribute('aria-expanded', 'true');
            }
            return;
        }

        if (action === 'picker-pick') {
            var wrapPicker = target.closest('.dbp-picker');
            if (!wrapPicker) return;
            var pickedId = target.dataset.value;
            var pickedGroup = groups.filter(function (item) {
                return item.id === pickedId;
            })[0];
            if (!pickedGroup) return;
            wrapPicker.dataset.value = pickedId;
            var labelEl = wrapPicker.querySelector('.dbp-picker-label');
            if (labelEl) labelEl.textContent = pickedGroup.name;
            Array.prototype.forEach.call(wrapPicker.querySelectorAll('.dbp-picker-opt'), function (opt) {
                opt.setAttribute('aria-selected', opt.dataset.value === pickedId ? 'true' : 'false');
            });
            closePickers();
            return;
        }

        if (action === 'add') {
            startAdd();
            return;
        }

        if (action === 'add-cancel') {
            render();
            return;
        }

        if (action === 'add-save') {
            saveAdd();
            return;
        }

        if (action === 'edit') {
            startEdit(Number(target.dataset.index));
            return;
        }

        if (action === 'edit-save') {
            saveEdit(Number(target.dataset.index));
            return;
        }

        if (action === 'edit-cancel') {
            render();
            return;
        }

        if (action === 'del') {
            var delIndex = Number(target.dataset.index);
            if (pendingDelete !== delIndex) {
                setDeletePending(target, delIndex);
                return;
            }
            clearDeletePending();
            removeItem(delIndex);
            return;
        }

        if (action === 'fill-one') {
            var one = itemAt(Number(target.dataset.index));
            if (!one) return;
            try {
                fillComposer(one.text);
                flashSide(target, one.text.length > 1000 ? '已填入 ' + Math.round(one.text.length / 1000) + 'k字' : '已填入');
            } catch (error) {
                flashSide(target, '失败', 'danger');
            }
        }
    });

    /* ---------------- 初始化 ---------------- */

    groups = loadGroups();
    activeGroup = groups[0].id;
    render();

    window.DoubaoPromptKit = {
        reload: reload,
        getGroups: function () {
            return groups;
        },
        setGroups: function (next) {
            groups = next;
            saveGroups(next);
            reload();
        },
        fill: fillComposer,
        reset: resetToDefault
    };
})();
