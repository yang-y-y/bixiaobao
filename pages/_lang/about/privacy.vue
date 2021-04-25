<template>
  <div>
    <Header @toSetlang="setLang" />
    <div class="privacy margin flex">
      <div class="container">
        <div class="cons">
          <h1>{{$t('message.隐私协议')}}</h1>
          <div class="infos">
            <span>{{$t('message.币小宝官方')}}</span>
            {{newsData.crate_date|changeFormatDate}}
          </div>
          <div class="datails">
            <div class="showCoon" v-if="$store.state.locale=='cn'">
              <p>币小宝（以下简称“公司”或“我们”）所经营的币小宝数字货币行情平台（以下简称“币小宝”，包括域名为bixiaobao.com网站、币小宝App、币小宝微信公众号、币小宝微信小程序等）在向您提供产品和/或服务时可能会收集和使用您的个人信息，在此特别提醒您认真阅读、充分理解我们的隐私政策（以下简称“本隐私政策”）。</p>
              <p>币小宝提供专业的区块链数据资讯、实时行情、趋势分析等内容以及个人主页、资产记帐、信息发布、社区交流等服务，公司亦和第三方合作通过币小宝为您提供其他更丰富的相关服务。希望您在使用币小宝所提供的产品和/或服务前仔细阅读并确认您已经充分理解本隐私政策所写明的内容，并让您可以按照本隐私政策的指引做出您认为适当的选择。本隐私政策中涉及的相关术语，我们用简明扼要的表述，以便您更好地理解。您勾选“我已阅读并同意”《币小宝隐私政策》，或在我们更新本隐私政策后（我们会及时提示您更新的情况）勾选“我已阅读并同意同意”《币小宝隐私政策》并继续使用币小宝提供的产品和/或服务，即意味着您同意本隐私政策（含更新版本）内容，并且同意我们按照本隐私政策收集、使用、保存和共享您的相关信息。</p>
              <p>如果您对本隐私政策有任何疑问、意见或建议，您可随时通过本隐私政策指明的联系方式联系我们咨询并获得反馈；如果您不同意本隐私政策，您应立即停止使用币小宝提供的产品与/或服务。我们希望通过本隐私政策向您说明您在使用币小宝提供的产品与/或服务时我们对您的信息采取的保护措施及您所享有的权利。特别提醒您注意，在收集您的个人信息后，我们可能对您的个人信息进行自动化数据处理。在此情况下，我们将按照国家通用的技术标准对数据进行去标识化形成用户数据库，使用符合去标识化标准的信息并不侵犯您的个人隐私或违反个人信息保护政策，我们有权对用户数据库进行分析并予以商业化的利用。</p>
              <h4>一、个人信息收集及使用规则</h4>
              <h6>（一）币小宝提供的产品和/或服务的核心业务功能</h6>
              <p>
                为实现核心业务功能，在您使用币小宝提供的产品和/或服务时，我们可能需要向您收集个人信息。以下将详细列出的核心业务功能及为实现该功能所需收集的个人信息，若您拒绝收集，则无法使用该服务。
                <br />（1）当您浏览信息时：您无需注册币小宝帐号即可使用浏览信息功能。浏览内容包括数字货币行情信息、指数信息、资讯信息；在浏览信息过程中我们可能会收集您使用币小宝的设备信息（包括设备型号、操作系统版本、分辨率、电信运营商、设备设置、设备定位）以便为您提供信息展示的最优方案。此外，在您使用在浏览信息功能的过程中，我们会自动收集您使用币小宝的详细情况，并作为有关的日志保存，包括但不限于您输入的搜索关键词信息和点击的链接，您浏览的内容，您使用的语言、访问的日期和时间、及您请求的网页记录、操作系统、软件版本号、登录IP信息。
                <br />（2）我们可能会要求授权使用设备存储读写权限以便加载行情信息等所必须的素材。币小宝不会滥用设备存储读写权限访问其他应用的文件。
              </p>
              <h6>（二）币小宝提供的产品和/或服务的附加业务功能</h6>
              <p>
                为了向您提供更优质的产品和/或服务，我们可能需要收集下述信息。如果您拒绝提供下述信息，不影响您正常使用本隐私政策第一部分“（一）”项所描述的核心业务功能，但我们无法向您提供某些特定功能和服务。
                <br />（1）当您登录币小宝帐号时：您注册成为币小宝的用户过程中，您可能需要向我们提供手机号码以创建用户名和密码。您在用户注册中可以提供更多额外信息补全个人资料，例如您的真实姓名、出生年月日、居住地、兴趣爱好、教育背景、工作职业，这些信息将有助于我们给您提供更个性化的服务，但不予提供并不会影响到您使用币小宝提供的基本服务。
                <br />（2）当您使用币小宝开放平台发布信息时：首先您需要提交相关认证信息，认证信息包括主体真实名称信息、头像LOGO、地址信息、主体身份信息、第三方社交账户信息、手机号码、邮箱，认证申请经我们审核通过后，您即可使用币小宝提供的前述服务。在发布信息的过程中，我们可能会获取您的设备存储读写权限、相册权限、照相机权限、地理位置权限，以上所您提供的信息与权限将有助于币小宝给您提供币小宝开放平台发布信息服务，如您不予提供并不会影响到您使用币小宝提供的基本服务，但会导致您无法使用币小宝提供的前述服务。
                <br />（3）当您分享币小宝内容时：我们可能会获取您的新浪微博、微信或其他分享网站的相关信息。
                <br />某些个人信息因为其特殊性可能被认定为个人敏感信息；个人敏感信息是指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息，本隐私政策中涉及的个人敏感信息包括：您的个人身份信息；网络身份识别信息（包括社交账号的账户名、账户昵称、）；其他信息（包括电话号码、网页浏览记录、精准定位信息）。当我们要将信息用于本隐私政策未载明的其它用途时，会事先征求您的同意。当我们要将基于特定目的收集而来的信息用于其他目的时，也会事先征求您的同意。
              </p>
              <h6>（三）征得同意的例外</h6>
              <p>
                在以下情形中，我们可能不会事先征求您的同意而获取相关信息：
                <br />（1）与国家安全、国防安全直接相关的;
                <br />（2）与公共安全、公共卫生、重大公共利益直接相关的;
                <br />（3）与犯罪侦查、起诉、审判和判决执行等直接相关的;
                <br />（4）出于维护您或他人的生命、财产等重大合法权益但又很难及时获得您本人同意的;
                <br />（5）所收集的个人信息是您自行向社会公众公开的;
                <br />（6）从合法公开披露的信息中收集的您的个人信息，如合法的新闻报道、政府信息公开等渠道;
                <br />（7）用于维护币小宝所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障;
                <br />（8）出于学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的;
                <br />（9）法律法规规定的其他情形。
              </p>
              <h4>二、我们如何使用 Cookie 和同类技术</h4>
              <h6>（一）Cookie</h6>
              <p>当您借助Web浏览器使用币小宝提供的产品和/或服务时，您会将一个或多个“Cookie”置入计算机中。如果您使用币小宝帐号登录，我们将设置或读取一个或多个其他Cookie。Cookie通常包含标识符、站点名称以及一些号码和字符。借助于Cookie，我们能够存储您的偏好或收藏等数据；我们不会将 Cookie 用于本隐私政策所述目的之外的任何用途。</p>
              <h6>（二）网站信标和像素标签</h6>
              <p>除Cookie外，我们还会使用网站信标和像素标签等其他同类技术。例如，我们向您发送的电子邮件或推送信息可能含有链接至币小宝提供的产品和/或服务的URL。如果您点击该链接，我们则会跟踪此次点击，帮助我们了解您关于币小宝的产品或服务偏好并改善客户服务。</p>
              <p>很多网络浏览器均设有Do Not Track功能，该功能可向网站发布Do Not Track请求。目前，主要互联网标准组织尚未设立相关政策来规定网站应如何应对此类请求。但如果您的浏览器启用了Do Not Track，那么我们的所有网站都会尊重您的选择。您还可以使用您的浏览器设置来删除或阻止您计算机上的Cookie。</p>
              <h4>三、我们如何共享、转让、公开披露您的个人信息</h4>
              <h6>（一）共享（三）Do Not Track（请勿追踪）</h6>
              <p>
                我们不会与公司以外的任何企业、组织和个人分享您的个人信息，但以下情况除外:
                <br />（1）在获取您明确同意的情况下共享；
                <br />（2）根据法律法规规定，或按政府主管部门的强制性要求，对外共享您的个人信息；
                <br />（3）与我们的附属公司共享：您的个人信息可能会与我们的附属公司共享。我们只会共享必要的个人信息，且受本隐私政策中所声明目的的约束。附属公司如要改变个人信息的处理目的，将再次征求您的授权同意。
                <br />（4）与授权合作伙伴共享：仅为实现本隐私政策中声明的目的，币小宝提供的某些产品和/或服务将由授权合作伙伴提供。我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。我们的合作伙伴无权将共享的个人信息用于任何其他用途。
                <br />对我们与之共享个人信息的企业、组织和个人，我们会与其签署严格的保密协定，要求他们按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。
              </p>
              <h6>（二）转让</h6>
              <p>
                我们不会将您的个人信息转让给任何企业、组织和个人，但以下情况除外：
                <br />（1）在获取您明确同意的情况下转让;
                <br />（2）符合与您签署的相关协议（包括在线签署的电子协议以及相应的币小宝服务规则）或其他的法律文件约定所提供。
              </p>
              <h6>（三）公开披露</h6>
              <p>
                我们仅会在以下情况下，公开披露您的个人信息：
                <br />（1）获得您明确同意后;
                <br />（2）您主动公开披露您的个人信息
                <br />（3）在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息；当我们收到上述披露信息的请求时，我们会要求必须出具与之相应的法律文件，如传票或调查函。
              </p>
              <h4>四、我们如何保护您的个人信息</h4>
              <p>我们已采用符合业界标准的各种安全技术和防护措施保护您的个人信息不被未经授权地访问、使用或泄漏，例如您与币小宝服务器交换数据时，我们采用HTTPS、SSL、AES等多种技术确保数据安全性和保密性；我们将严格遵循国内外的安全标准进行安全体系搭建，并结合前沿、主流的安全技术进行落地，防止用户的个人信息在未经授权时被访问、使用、泄露。我们建立了完善的安全防御体系，当我们受到外部的网络攻击、病毒感染时，能对攻击行为进行及时主动拦截。</p>
              <p>我们已经建立健全数据安全管理体系，包括对用户信息进行分级分类、加密保存、数据访问权限划分；制定了内部数据管理制度和操作规程，从数据的获取、使用、销毁都有严格的流程要求，避免您的隐私数据被非法使用；我们将定期举办安全和隐私保护培训，提高员工的个人信息保护意识。但您应理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全，有可能因我们可控范围外的因素而出现信息泄漏，若不幸发生个人信息安全事件，我们将按照法律法规要求，及时通过币小宝站内信/您预留的联系方式等向您告知安全事件的基本情况和可能的影响、我们已采取或将采取的应急响应及其他有关处置措施、对您的补救措施等。若难以逐一告知个人信息主体时，我们将采取合理、有效的方式发布公告并将主动向有关监管部门上报个人信息安全事件的处置情况。</p>
              <p>若您发现您的个人信息泄露时，请您立即通过本隐私政策约定的联系方式与我们联系，以便我们及时采取相应措施。</p>
              <h4>五、您如何管理您的个人信息</h4>
              <p>我们将尽最大努力采取适当的技术手段，保障您可以访问、更正、补充和删除自己的注册信息或使用币小宝提供的产品和/或服务时所提供的其他个人信息。</p>
              <h6>（一）访问您的个人信息</h6>
              <p>您有权访问您的个人信息，法律法规规定的例外情况除外。如果您想行使数据访问权，可以联系我们，原则上我们会在15日内答复。联系方式详见本隐私政策第九部分“如何联系我们”。</p>
              <h6>（二）更正或补充您的个人信息</h6>
              <p>当您发现我们处理的关于您的个人信息有错误时，您可以要求我们做出更正或补充。联系方式详见本隐私政策第九部分“如何联系我们”。</p>
              <h6>（三）删除您的个人信息</h6>
              <p>
                您可以通过联系我们变更您授权我们收集和使用的您的个人信息范围、以及注销帐号，取消我们收集和使用您的个人信息的全部授权。在您注销帐号后，除法律法规另有规定或者另与您另有书面约定，我们将停止使用并删除您的个人信息。
                在下列情形中，您可以向我们提出删除您的个人信息的请求：
                <br />（1）我们处理您的个人信息的行为违反法律法规或与您的约定的；
                <br />（2）我们对您的个人信息的收集和使用，未能获得您明确同意的；
                <br />（3）我们终止向您提供或您主动终止使用币小宝提供的产品或服务的。
              </p>
              <p>您可以随时通过本隐私政策第九部分“如何联系我们”中的联系方式与我们取得联系，我们原则上将在十五日内回复您请求。</p>
              <p>当您删除您的个人信息后，我们可能不会立即从备份系统中删除相应的信息，但会在备份更新时删除这些信息。在您注销帐号时我们将删除您的个人信息，但已经用于用户画像的匿名化处理信息或根据法律法规不得删除的情形除外。</p>
              <p>我们匿名化处理或删除您的个人信息时，如您的个人信息曾被共享，我们还会通知相关企业、组织或个人对您的个人信息做匿名化或删除处理。</p>
              <h6>（四）改变您授权同意的范围</h6>
              <p>您可以通过更改手机设备中的相机、定位等访问权限或更改浏览器功能设置、更改设置选项。如果您不愿接受我们给您发送的推送信息，您可通过本隐私政策第九部分“如何联系我们”中的联系方式与我们取得联系，我们原则上将在十五日内回复您请求。</p>
              <h6>（五）注销帐号</h6>
              <p>您可随时通过联系我们注销帐号或联系我们注销您此前注册的帐号，联系方式详见本隐私政策第九部分“如何联系我们”，我们原则上将在十五日内回复您请求，在注销帐号后币小宝将停止为您提供产品和/或服务，我们将依据您的要求删除您的个人信息，法律法规另有规定的除外。</p>
              <h6>（六）获取个人信息副本</h6>
              <p>您有权通过本隐私政策第九部分“如何联系我们”中列明的联系方式联系我们，获得我们收集的您的个人基本资料、个人身份信息等个人信息副本。</p>
              <h6>（七）约束信息系统自动决策</h6>
              <p>在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将提供适当的救济方式。</p>
              <h6>（八）响应您的上述请求</h6>
              <p>为保障安全，在您提出上述需求时我们可会要求先验证您的身份，再处理您的请求。通常，我们将在十五日内答复您的请求。对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情收取一定成本费用。对于那些无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际（例如，涉及备份磁带上存放的信息）的请求，我们可能会予以拒绝。</p>
              <p>
                在以下情形中，我们将无法响应您的请求：
                <br />（1）与我们履行法律法规规定的义务相关的；
                <br />（2）与国家安全、国防安全直接相关的；
                <br />（3）与公共安全、公共卫生、重大公共利益直接相关的；
                <br />（4）与犯罪侦查、起诉、审判和执行判决等直接相关的；
                <br />（5）我们有充分证据表明用户存在主观恶意或滥用权利的；
                <br />（6）出于维护用户或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
                <br />（7）响应用户的请求将导致用户或其他个人、组织的合法权益受到严重损害的；
                <br />（8）涉及商业秘密的。
              </p>
              <h4>六、我们如何处理儿童的个人信息</h4>
              <p>如果没有父母或其他监护人的同意，儿童不得创建自己的用户帐号。对于经父母或其他监护人同意而收集儿童个人信息的情况，我们只会在受到法律允许、父母或其他监护人明确同意或者保护儿童所必要的情况下使用或公开披露此信息。</p>
              <p>尽管当地法律和习俗对儿童的定义不同，但我们将不满 14 周岁的任何人均视为儿童。</p>
              <p>如果我们发现自己在未事先获得可证实的父母或其他监护人同意的情况下收集了儿童的个人信息，则会设法尽快删除相关数据。如果其父母或其他监护人明确不同意儿童的创建用户帐号行为可通过本隐私政策“第九部分”中列明的联系方式联系我们，以及保护儿童所必要的其他情况下，我们将会中止或限制儿童对于币小宝产品和/或服务的使用。</p>
              <h4>七、您个人信息的存储</h4>
              <p>在中华人民共和国境内收集和产生的用户个人信息，将存储在中华人民共和国境内。</p>
              <p>由于我们通过遍布全球的资源和服务器提供币小宝产品和/或服务，这意味着，在获得您的授权同意并对数据跨境行为作出安全评估后，您的个人信息可能会被转移到您使用币小宝产品和/或服务所在国家/地区的境外管辖区，或者受到来自这些管辖区的访问。</p>
              <p>此类管辖区可能设有不同的数据保护法，甚至未设立相关法律。在此类情况下，我们会确保您的个人信息得到在中华人民共和国境内足够同等的保护。例如，我们会请求您对跨境转移您个人信息的同意，或者在跨境数据转移之前实施数据去标识化等安全举措。</p>
              <h4>八、本隐私政策如何更新</h4>
              <p>我们可能不时的修订本隐私政策，未经您明确同意，我们不会削减您按照本隐私政策所应享有的权利；对于重大变更，我们还会以更为显著的方式如手机客户端推送通知、弹窗、邮件等形式通知您，以便您能及时了解本隐私政策的变更。重大变更是指币小宝的服务模式发生重大变化及对于您在本协议中享有的权利和义务进行了重要调整的情况。变更后的隐私政策版本将会在币小宝上予以发布。</p>
              <p>请您注意我们可能未经您同意对于本隐私政策里的段落文字及错误做出必要性的修正；我们会将隐私政策的各个版本存档，以供您在必要时对比查阅。</p>
              <h4>九、如何联系我们</h4>
              <p>
                公司设有专门的合规部门监督个人信息保护事宜，有关本隐私政策或我们的隐私措施相关问题可通过如下方式联系我们：
                <br />（一）如您对本隐私政策或您个人信息的相关事宜有任何问题、意见或建议，请联系我们。
                <br />个人信息保护负责人邮箱：contact@bixiaobao.com；
                <br />（二）一般情况下，我们将在十五天内回复。如果您对我们的回复不满意，特别是我们的个人信息处理行为损害了您的合法权益，您还可以向网信、电信、公安及工商等监管部门进行投诉或举报。
              </p>
              <h4>十、附则</h4>
              <p>我们可能与不同的第三方合作方进行合作，包括但不限于推广第三方的产品和/或服务，我们无法在此穷尽我们可能合作的第三方的类别；但需要您特别注意本隐私政策的相关规定仅适用于币小宝提供的产品和/或服务，并不适用于第三方通过币小宝提供的产品和/或服务，或者币小宝产品和/服务上的第三方链接所指向的产品和/或服务。在此情况下，建议您认真阅读和了解第三方的隐私政策。</p>
              <p>本隐私政策的全部条款属于《币小宝服务协议》的重要组成部分之一，如因本隐私政策产生的任何争议将提交币小宝所在地有管辖权的人民法院寻求解决。</p>
            </div>
            <div class="showCoon" v-else>
              <p>Bixiaobao ("Company" or "We") operates a Bixiaobao Big Data Analysis platform ("Bixiaobao"), which includes the domain name com, Bixiaobao App, Bixiaobao Weibao Weibo Weibo Weibo, etc. which may provide you with the following personal information when you read carefully.</p>
              <p>Bixiaobao offers professional blockchain data information, real-time market information, trend analysis, and personal home page, asset bookkeeping, information dissemination, community exchange, etc.Hopefully, you will read carefully before using the products and/or services provided by Bixiaobao and confirm that you have fully understood what this privacy policy says and that you can make what you think is appropriate in accordance with the guidelines of this privacy policy.The relevant terms in this privacy policy are described in a concise way so that you can better understand them.Your tick "I have read and agreed to" or "I have read and agreed to" after we update this privacy policy (we will prompt you in time) and continue to use the products and/or”services provided by Bixiaobao”, which means that you agree to this privacy policy (including updates) and that you agree to keep your information and share it in accordance with our privacy policy.</p>
              <p>If you have any questions, comments, or suggestions about this Privacy Policy, you can contact us at any time through the contact specified in this Privacy Policy and get feedback; if you do not agree with this Privacy Policy, you should immediately stop using the products and/or services provided by Bixiaobao.We would like to explain to you through this Privacy Policy the safeguards we take against your information and the rights you enjoy when using the products and/or services provided by Bixiaobao.In particular, you are reminded that we may automate the processing of your personal data after collecting your personal information.In this case, we will demarcate the data to form a user database according to the technical standards commonly used by the state. Using information that meets the de-recognition criteria does not violate your privacy or personal information protection policy. We have the right to analyze and commercialize the user database.</p>
              <p>All content on this website can be used in a number of languages, such as user convenience, conflict or omission, whichever is Chinese.</p>
              <p>1. Rules for Personal Information Collection and Use</p>
              <p>
                1-1) courtesy of Bixiaobaocore business functions of the products and/or services of the company
                To implement core business functions, use them at your disposalWe may need to collect from you the products and/or services provided by Bixiaobao.Collect personal information. The following list of core business functions and personal information gathered for the purpose of implementing the function is not available if you refuse to collect it.
              </p>
              <p>(a) When you browse information: You do not need to You can use the browse information function by registering your Bixiaobao account. Browse content includes Cryptocurrency market information, index information, information information information, and during the browsing process we may collect information about your device using Bixiaobao (including device model, operating system version, resolution, telecommunications operator, device settings, device positioning) to provide you with the lowest possible information display.Excellent solution. In addition, we will automatically collect details about your use of Bixiaobao and save them as related logs, including but not limited to the search keyword information and click links you entered, the content you visited, the date and time you visited, and the web page records you requested, operating system, software version number, login IP information.</p>
              <p>(b) We may request authorization to useDevices store read and write permissions to load information, etc. necessary material.Bixiaobao does not abuse the device's storage read and write permissions to access files in other applications.</p>
              <p>1-2) courtesy of BixiaobaoAdditional business functions of the products and/or services of the Company</p>
              <p>In order to provide you with better quality products and/or services, we may need to collect the following information.If you refuse to provide the following information, no.Affects your normal use of the core business functions described in Part I of this Privacy Policy (I), but we are unable to provide you with certain specific features and services.</p>
              <p>a) When you log on to Bixiaobao account: During the process of registering you as a Bixiaobao user, you mightNeed to provide us with a cell phone number to create a user name and password.You can provide additional information in your user registration, such as your real name, date of birth, place of residence, hobby, educational background, job career, which will help us to give you more personal informationservices, but not provided and will not affect your basic services provided by Bixiaobao.</p>
              <p>b) When you use BixiaobAo Open Platform releases information: First you need to submit related authentication information, authentication informationIncluding the subject's real name information, head image LOGO, address information, subject identity information, third party social account information, mobile phone number, mailbox, authentication application, we have approved you can use the services provided by Bixiaobao.In the process of publishing information, we mayAccess to your device's storage read and write permissions, photo album permissions, camera permissions, geographic location permissions, and the information and permissions you provide will help Bixiaobao provide you with Bixiaobao open platform publishing information services, if you do not provide and will not affect your use of the basic services provided by Bixiaobao, but will render you unable to use the pre-mentioned services provided by Bixiaobao.</p>
              <p>
                c) When you share BixiaobAo Content: We may have access to your Sina Weibo, WeChat or other shared websites.Relevant information.
                Certain personal information is possible because of its particularity.Personal sensitive information is deemed to be personal; personal sensitive information is to be illegally provided or abused in the event of leakagePersonal sensitive information in this Privacy Policy includes your personal identity information; network identity information (including account name, account nickname, account name); and personal information that may endanger your personal reputation, physical and mental health, or discriminatory treatment.information (including telephone numbers, web browsing history, accurate positioning of information).Your prior consent will be sought when we want to use the information for other purposes not specified in this Privacy Policy.Your prior consent will also be sought when we want to use the information collected for other purposes.
              </p>
              <p>1-3) Exception of Consent</p>
              <p>In the following cases, we may not be able to make it.Get your permission first for related information:</p>
              <p>a) Straightening with National Security and National Securityassociated;</p>
              <p>b) with public safety, public health,directly related to major public interests;</p>
              <p>c) To investigate, prosecute and try criminal offencesdirectly related to execution of the judgment;</p>
              <p>d) To protect your life or someone else's.but it is difficult to obtain your own consent in time;</p>
              <p>e) The personal information collected is from you.public disclosure of the public;</p>
              <p>f) From Legal and Open DisclosureYour personal information collected, such as legitimate news reporting, government information disclosure, etc.</p>
              <p>g) For maintenance of Bixiaobnecessary for the safe and stable operation of products or services provided by ao, e.g. discovery, disposalbreakdown of products or services;</p>
              <p>h) For the sake of academic research, andPersonal information contained in the results of an academic study or description is given to the outside world.de-identification treatment;</p>
              <p>(9) Other circumstances as stipulated in the law and regulations。</p>
              <p>2. how do we use Cookie and the like?</p>
              <p>2-1) Cookie</p>
              <p>When you use BixiaobaoTi with a Web browserwhen the products and/or services are suppliedYou will put one or more cookies into your computer.If you log in using the Bixiaobao account, we will set up or read one or more other cookies.Cookies usually contain identifiers, site names, and some numbers and characters.With the help of Cookie, we are able to store data such as your preferences or favorites; we will not use cookies for any purpose other than the purposes described in this privacy policy.</p>
              <p>2-2) Site Map and pixel tags</p>
              <p>In addition to cookies, we will also use website beacons and pixelsand other similar technologies such as labeling.For example, the email or push information we sent to you may contain URLs that link to products and/or services provided by Bixiaobao.If you click on</p>
              <p>the link, we will follow this click to help us understand your product or service preferences in Bixiaobao and improve customer service.</p>
              <p>Many web browsers have Do Not Truckfunction, which can be accessed from the website atPublish Do Not Rack Request.At present, major Internet standards bodies have not established relevant policies to specify how websites should respond to such requests.But if your</p>
              <p>browser enables Do Not Truck, then all of our websites will respect your choice.You can also use your browser settings to delete or block cookies on your computer.</p>
              <p>3. How do we share, transfer and disclose your personal information publicly</p>
              <p>(3-1) Sharing (3-3) Do Not Tack (please Do Not Track)</p>
              <p>We will not share it with any business, organisation or individual other than the companyYour personal information, but the following:Exceptions:</p>
              <p>a) Share with your explicit consent;</p>
              <p>b) Under the provisions of laws and regulations, or in accordance with the strength of the competent department of government,You're required to share it with the outside world.personal information;</p>
              <p>c) Share with our affiliates: Your personal information may be possiblewill share with our subsidiariesWe share only the necessary personal information and are bound by the purpose stated in this Privacy Policy.If the subsidiary wants to change the purpose of processing personal information, it will seek your authorization consent again.</p>
              <p>d) Share with Authorized Partners: Only for this Privacy PolicyPurpose of the declaration, Bix.Certain products and/or services provided by the IABO will be provided by authorized partners.We may share some of your personal information with partners to provide better customer service and user experience.We will share your personal information only for legitimate, just, necessary, specific, and explicit purposes, and will only share the personal information necessary to provide services.Our partners are not authorized to use shared personal information for any other purpose.</p>
              <p>to the enterprises, organizations and individuals that share personal information with us,We will sign a strict insurance policy with him.A secret agreement requiring them to handle personal information in accordance with our instructions, this Privacy Policy and any other relevant confidentiality and security measures.</p>
              <p>3-2) Transfer</p>
              <p>We will not transfer your personal information to any enterprise, organization or organization.Individuals, except in the following circumstances：</p>
              <p>a) transfer with your explicit consent;</p>
              <p>b) Conformity with the relevant agreements signed with you (including those signed online)Electronic Protocol and the corresponding Bor other legal document conventions.</p>
              <p>3-3. Public disclosure</p>
              <p>We will disclose your personal information only in the following circumstances:</p>
              <p>a) with your explicit consent;</p>
              <p>b) You have taken the initiative to disclose your personal information publicly</p>
              <p>c) In the case of law, proceedings, litigation or competent government department, the Secretary for Financial Services and the Commissioner of Inland Revenue, the Commissioner of Inland Revenue, the Commissioner of Inland Revenue, the Commissioner of Inland Revenue, the Commissioner of Inland Revenue, Mr Donald Tsang, and the Commissioner of Inland Revenue.subject to regulatory requirements, I have to inform the Inland Revenue Department (IRD)We may disclose your personal information publicly; when we receive a request for such disclosure, we will require that legal documents, such as summonses or letters of inquiry, be produced.</p>
              <p>4. How do we protect your personal information</p>
              <p>We have adopted various types of security measures that meet the industry standard.Full technology and protection protect your personal information from unauthorized access, use, or leakage. For example, when you exchange data with Bixiaobao servers, we use a variety of technologies such as HTTPS, SSL, AES to ensure data security and confidentiality; we will strictly follow domestic and foreign security standards for security system construction, and combine leading-edge, mainstream security technologies to prevent users from being accessed and accessed without authorization.We have established a complete security defense system that enables us to intercept attacks on time when we are exposed to external cyber attacks and when we are infected</p>
              <p>We've established and sound data security management systems.We will organize security and privacy protection training regularly to enhance the staff's awareness of personal information protection.However, you should understand that in the Internet industry, due to technical limitations and possible malicious practices, information leakage may occur due to factors outside our control. We will follow the example of personal information security.The law and regulations require that you be informed of the basic situation and possible effects of the safety event through the Bixiaobao station letter/ the contact you have reserved, etc. We have taken or will take emergency response and other related measures, your remedial measures, etc.If it is difficult to inform the subject of personal information one by one, we will issue a public announcement in a reasonable and effective manner and will take the initiative to report to the relevant regulatory authorities on the disposition of personal information security incidents.</p>
              <p>If you find your personal information leaking, pleaseYou immediately contact us through the contact agreed upon in this Privacy Policy so that we can take timely action.</p>
              <p>5. How do you manage your personal information</p>
              <p>We'll do our best to take the right technique.means to ensure that you can access, correct, supplement and delete your own registration information or other personal information provided by Bixiaobao when using the products and/or services provided by Bixiaobao.</p>
              <p>5-1) Access your personal information</p>
              <p>You have access to your personal information, the law.Exceptions provided for by the statute.If you want to exercise your data access rights, contact us and in principle we will reply within 15 days.Contact details are described in Part 9 of this Privacy Policy, "How to Contact Us."</p>
              <p>5-2) Correcting or supplementing your personal information</p>
              <p>When you find out what we're dealing with about you,You can ask us to correct or supplement human information when there is a mistake.Contact details are described in Part 9 of this Privacy Policy, "How to Contact Us."</p>
              <p>5-3) Delete Your Personal Information</p>
              <p>You can change your authorization by contacting us.The range of your personal information that we collect and use, and cancel the account, cancel our full authorization to collect and use your personal information."After you have cancelled your account, we have made a written agreement with you, except as otherwise provided by law and regulations, or as otherwise agreed in writing."will stop using and delete your personalinformation.</p>
              <p>You may refer to us in the following cases:To issue a request to delete your personal information:</p>
              <p>a) We handle your personal informationact in violation of the law and regulations or of an agreement with you;</p>
              <p>b) Our collection of your personal informationthe collection and use of the collection and use of the materials, which have not been expressly agreed with you;</p>
              <p>c) We terminate our offer to you or your Lord.or services provided by Bixiaobao.</p>
              <p>You may pass this Privacy Policy No. 9 at any time.Some of the contacts in "How to Contact Us" are contacted with us and we will, in principle, reply to your request within 15 days.</p>
              <p>After you delete your personal information, weIt may not immediately delete the corresponding information from the backup system, but this information will be deleted during the backup update.We will delete your personal information when you cancel your account, but have been used to process information anonymously for user portraits or under the lawexcept where the statute may not be deleted.</p>
              <p>We process or delete your personal name anonymously.In information, if your personal information has been shared, we will also inform the relevant business, organization, or individual concerned to make anonymous or delete your personal information.</p>
              <p>5-4) Change the scope of your delegation's consent</p>
              <p>You can change the photos in your mobile phone deviceAccess permissions such as computer, location, etc. change browser function settings, change settings options.If you are not willing to accept the push message we sent you, you may contact us through the link in</p>
              <p>Part 9 of this Privacy Policy.We will, in principle,Reply to your request within fifteen days.</p>
              <p>5-5) Cancellation of Account Number</p>
              <p>You can cancel your account at any time by contacting us.Or contact us to cancel your previously registered account. See "How to Contact Us" in Part 9 of this Privacy Policy. We will, in principle, respond to your request within 15 days and Bixiaobao will cease to be a non-resident after cancellation.You offer products and/or services, IWe will delete your personal information according to your request, except as otherwise provided in the law and regulations.</p>
              <p>5-6) Obtain a copy of your personal information</p>
              <p>You have the right to pass through Part 9 of this Privacy PolicyContact us as listed in "How to Contact Us" for copies of your personal information, such as your basic personal data, your personal identity information, etc.</p>
              <p>5-7) Constraints information system automatic decision making</p>
              <p>In some of our business functions, we may be onlyDecisions are made based on non-artificial automatic decision-making mechanisms such as information systems and algorithms.If these decisions significantly affect your legitimate rights and interests, you have the</p>
              <p>right to ask us for an explanation and we will also provide appropriate relief.</p>
              <p>5-8) Responding to your above request</p>
              <p>In order to ensure safety,the above requirements are put forward.We may request to verify your identity before processing your request.Normally, we will reply to your request within fifteen days.We do not charge you in principle for your reasonable request,but please repeat it several times beyond the reasonable limit.Please, we'll charge you a certain percentage.This cost. Requires too many technical means (e.g., development of new systems or fundamental changes to existing practices), risks to others' legitimate rights and interests, or very unrealistic requests (e.g. involving information stored on backup tapes)we may refuse.</p>
              <p>We will not be able to respond in the following cases:Your request:</p>
              <p>a) Performance with us in accordance with the provisions of the laws and regulationsrelated to the obligations of the employer;</p>
              <p>b) Straightening with National Security and National Securityassociated;</p>
              <p>c) with public safety, public health,directly related to major public interests;</p>
              <p>d) To investigate, prosecute, or try a crimedirectly related to the execution of a judgment, etc.</p>
              <p>e) We have sufficient evidence that userssubjectively malicious or abusing one's rights;</p>
              <p>f) for the purpose of maintaining users or other individualssuch as life and property, but it is difficult to obtain the consent of the person;</p>
              <p>g) Responding to a user's request will result in usein cases where the legitimate rights and interests of the household or other individuals or organizations are seriously impaired;</p>
              <p>h) involving trade secrets.</p>
              <p>6. How do we handle children's personal information</p>
              <p>without the consent of parents or other guardians,Children are not allowed to create their own user accounts.In the case of collecting personal information of children with the consent of parents or other guardians, we will only use or disclose it publicly if it is legally permitted, and where it is necessary for parents or other guardians to expressly agree with or protect children.</p>
              <p>Although local laws and customs do not define children,However, we consider anyone under the age of 14 as a child.</p>
              <p>If we find ourselves unproven,If the child's personal information is collected with the consent of the actual parent or other guardian, the child will be deleted as soon as possible.If the parent or other guardian expressly disagrees with the child's user account creation behaviour, he or she may contact us through the contacts specified in Part 9 of this Privacy Policy, and what is necessary to protect the child.In his case, we will suspend or restrict the use of Bixiaobao products and/or services by children.</p>
              <p>7. Storage of your personal information</p>
              <p>within the territory of the People's Republic of ChinaThe personal information of the user will be stored within the territory of the People's Republic of China.</p>Because we've passed all over the world.Resources and servers provide Bixiaobao products and/or services, which means that, in the event of obtaining your authorization,Your personal information may be transferred to overseas jurisdictions where you use Bixiaobao
              <p>products and/or services, or be visited from these jurisdictions, after a safety assessment of your data's cross-border activities.</p>
              <p>This type of jurisdiction may be differentdata protection laws, even without relevant laws.In such cases, we will ensure that your personal information is available.Equal protection is sufficient within the territory of the People's Republic of China.For example, we will ask for your consent to transfer your personal information across borders, or for security measures such as data de-recognition before cross-border data transfers.</p>
              <p>8. How this Privacy Policy Update</p>
              <p>We may revise our privacy from time to time.Policies, without your explicit consent, will not reduce your rights under this Privacy Policy; we will also inform you in more significant ways such as cell phone client push notifications, pop-up windows, mail, etc., so that you can understand the changes in this Privacy Policy in time.Significant changes refer to major changes in Bixiaobao's service model and important adjustments to your rights and obligations in this Agreement.The changed version of privacy policy will be published on Bixiaobao.</p>
              <p>Please note that we may not have joined you.Intended to make necessary corrections to paragraphs and errors in this Privacy Policy; we will archive various versions of the Privacy Policy for you to compare them when necessary.</p>
              <p>9. How to Contact Us</p>
              <p>The company has special regulations.Department monitors personal information protection. Questions relating to this privacy policy or our privacy measures can be contacted by:</p>
              <p>9-1) If you have any personal information about thisContact us if you have any questions, comments, or suggestions regarding the policy or your personal information.</p>
              <p>Personal Information Protection OfficerMailboxes: contact@bixiaobao.com ;</p>
              <p>9-2) Generally speaking,We will reply within fifteen days.If you are not satisfied with our response, especially if our personal information processing has compromised your legitimate rights and interests, you can also access the Internet.Complaints or reports are made by the regulatory authorities such as letters, telecommunications, public security and industrial and commercial sectors.</p>
              <p>10. Supplementary Provisions</p>
              <p>We may work with different third-party partners, including but not limited to promoting third-party products and/or services, and we cannot exhaust this third-party category here; however, it requires your special attention that the relevant provisions of this Privacy Policy apply only to products and/or services provided by Bixiaobao and do not apply to products and/or services directed by third-party links provided through Bixiaobao.In this case, it is recommended that you read and understand third-party privacy policies carefully.</p>
              <p>The full terms of this Privacy Policy fall under one of the important components of the Bixiaobao Service Agreement and any dispute arising from this Privacy Policy will be referred to the competent people's court at the site of Bixiaobao for settlement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      titleTemplate: this.$t("message.隐私协议"),
      meta: [
        {
          charset: "utf-8"
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        },
        {
          hid: "kewords",
          name: "keywords",
          content: this.$t("news.keywords")
        },
        {
          hid: "description",
          name: "description",
          content: this.$t("news.description")
        }
      ]
    };
  },
  name: "privacy",
  data() {
    return {
      newsData: [],
      NextLink: [],
      LastLink: [],
      seoData: []
    };
  },
  created() {},
  components: {
    // 组件的引用
  },
  methods: {
    setLang(msg) {},
    loadData(id) {}
  },
  mounted() {
    // this.loadData(this.$route.params.id)
  }
};
</script>
<style lang="scss">
.privacy {
  width: 100%;
  min-height: 800px;
  .container {
    min-width:1200px;
      @media screen and (min-width:1200px){
        width: 1200px;
       }
       @media screen and (min-width:1440px){
        width: 1400px;
       }
    min-height: 800px;
    margin: 0 auto;
    background: #fff;
    border-radius: 4px;
    padding: 40px 50px;
    .breadcrumb {
      margin-bottom: 50px;
    }
    .cons {
      width: 90%;
      margin: 0 auto;
      h1 {
        text-align: center;
        font-size: 22px;
        font-weight: 500;
      }
      .infos {
        text-align: center;
        padding: 30px 0;
        margin-bottom: 50px;
        border-bottom: 1px solid #cccccc;
        color: #a1a6b4;
        span {
          color: #0386d9;
          margin-right: 20px;
        }
      }
      .datails {
        min-height: 500px;
      }
      .showCoon {
        h4 {
          margin-bottom: 5px;
        }
        p {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>