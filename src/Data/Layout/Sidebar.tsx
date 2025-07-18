import { MenuItem } from "@/Type/Layout/Sidebar";

export const MenuList: MenuItem[] = [
  {
    title: "General",
    Items: [
      {
        title: "Dashboard",
        id: 1,
        icon: "Home",
        type: "sub",
        badge: "3",
        children: [
          { path: `/dashboard/ecommerce`, title: "Dashboard", type: "link" },
        ],
      },
      /*{
        title: "Imports",
        id: 34,
        icon: "Download",
        type: "sub",
        active: false,
        children: [
          { path: `/services/pppoeplans/importpppoeplans`, title: "Import PPPOE Plans", type: "link" },
          { path: `/clients/mikrotikimport`, title: "Import PPPOE Clients", type: "link" },
        ],
      },*/
      {
        title: "Hotspot",
        id: 34,
        icon: "Heart",
        type: "sub",
        active: false,
        children: [
          { path: `/hotspot/captive-portal`, title: "Captive Portal", type: "link" },
        ],
      },
      {
        title: "Brands",
        id: 34,
        icon: "Bag",
        type: "sub",
        active: false,
        children: [
          { path: `/brands/viewbrands`, title: "Brands", type: "link" },
          { path: `/brands/addbrand`, title: "Add Brand", type: "link" },
        ],
      },
      {
        title: "Clients",
        id: 34,
        icon: "Ticket",
        type: "sub",
        active: false,
        children: [
          { path: `/clients/addpppoeclient`, title: "Add PPPoE client", type: "link" },
          { path: `/clients/addstaticclient`, title: "Add Static client", type: "link" },
          { path: `/clients/hotspotclients`, title: "Hotspot Clients", type: "link" },
          { path: `/clients/pppoeclients`, title: "PPPoE Clients", type: "link" },
          { path: `/clients/staticclients`, title: "Static Clients", type: "link" },
          /*{ path: `/clients/importexistingclients`, title: "Import Clients", type: "link" },*/
          /*{ path: `/clients/clientslead`, title: "Clients Lead", type: "link" },*/
        ],
      },
      /*{
        title: "Prepaid",
        id: 34,
        icon: "Ticket",
        type: "sub",
        active: false,
        children: [
          { path: `/prepaid/prepaidusers`, title: "Prepaid Users", type: "link" },
          { path: `/prepaid/prepaidvouchers`, title: "Prepaid Vouchers", type: "link" },
          { path: `/prepaid/refillaccount`, title: "Refill Account", type: "link" },
          { path: `/prepaid/rechargeaccount`, title: "Recharge Account", type: "link" },
        ],
      },
      {
        title: "Burst",
        id: 34,
        icon: "Pie",
        type: "sub",
        active: false,
        children: [
          { path: `/burst/addburst`, title: "Add Burst", type: "link" },
          { path: `/burst/burstlist`, title: "Burst List", type: "link" },
        ],
      },*/
      {
        title: "Services",
        id: 34,
        icon: "Paper",
        type: "sub",
        active: false,
        children: [
          { path: `/services/staticplans`, title: "Static Plans", type: "link" },
          { path: `/services/hotspotplans`, title: "Hotspot Plans", type: "link" },
          { path: `/services/pppoeplans`, title: "PPPOE Plans", type: "link" },
          { path: `/services/pppoeplans/importpppoeplans`, title: "Import PPPOE Plans", type: "link" },
          /*{ path: `/services/bandwidthplans`, title: "Bandwidth Plans", type: "link" },*/
        ],
      },
      {
        title: "Payments",
        id: 34,
        icon: "Wallet",
        type: "sub",
        active: false,
        children: [
          /*{ path: `/payments/mpesatransactions`, title: "Mpesa Transactions", type: "link" },*/
          { path: `/payments/mpesareports`, title: "Mpesa Reports", type: "link" },
          /*{ path: `/payments/mpesatransactionstatus`, title: "Transaction Status", type: "link" },*/
          { path: `/payments/pppoetransactions`, title: "PPPOE Transactions", type: "link" },
          { path: `/payments/alltransactions`, title: "All Transactions", type: "link" },
        ],
      },
      {
        title: "Network",
        id: 34,
        icon: "Discovery",
        type: "sub",
        active: false,
        children: [
          { path: `/network/routers`, title: "Routers", type: "link" },
          { path: `/network/pingrouter`, title: "Ping Router", type: "link" },
          // { path: `/network/ippool`, title: "IP Pool", type: "link" },
        ]
      },
      {
        title: "System Logs",
        id: 34,
        icon: "Activity",
        type: "sub",
        active: false,
        children: [
          { path: `/systemlogs/hotspotlogs`, title: "Hotspot Logs", type: "link" },
          { path: `/systemlogs/pppoelogs`, title: "PPPOE Logs", type: "link" },
          /*{ path: `/systemlogs/activitylogs`, title: "Activity Logs", type: "link" },*/
          { path: `/systemlogs/smslogs`, title: "SMS Logs", type: "link" },
        ]
      },
      /*{
        title: "Settings",
        id: 34,
        icon: "Setting",
        type: "sub",
        active: false,
        children: [
          { path: `/settings/generalsettings`, title: "General Settings", type: "link" },
          { path: `/settings/administratorusers`, title: "Administrator Users", type: "link" },
          { path: `/settings/administratorusers/addnewadministrator`, title: "Add Admins", type: "link" },
          { path: `/settings/paymentsettings`, title: "Payment Settings", type: "link" },
        ]
      },*/
      {
        title: "People",
        icon: "Profile",
        type: "sub",
        active: false,
        children: [
          { path: `/users/people`, type: "link", title: "Managers" },
        ],
      },      
      /*{
        title: "Widgets",
        id: 2,
        icon: "Pie",
        type: "sub",
        active: false,
        children: [
          { path: `/widgets/general`, title: "General", type: "link" },
          { path: `/widgets/chart`, title: "Chart", type: "link" },
        ],
      },*/
    ],
  },
  /*{
    title: "Applications",
    lanClass: "lan-8",
    Items: [
      {
        title: "Project",
        id: 3,
        icon: "Info-circle",
        type: "sub",
        active: false,
        children: [
          { path: `/project/projectlist`, type: "link", title: "Project-List" },
          { path: `/project/createnew`, type: "link", title: "Create New" },
        ],
      },
      { path: `/app/filemanager`, icon: "Paper", title: "File Manager", type: "link" },
      {
        title: "Ecommerce",
        id: 6,
        icon: "Bag",
        type: "sub",
        active: false,
        children: [
          { path: `/ecommerce/products`, title: "Products", type: "link" },
          { path: `/ecommerce/productpage`, title: "Product Page", type: "link" },
          { path: `/ecommerce/addproduct`, title: "Add Products", type: "link" },
          { path: `/ecommerce/productlist`, title: "Product List", type: "link" },
          { path: `/ecommerce/paymentdetails`, title: "Payment Details", type: "link" },
          { path: `/ecommerce/orderhistory`, title: "Order History", type: "link" },
          {
            title: "Invoice",
            type: "sub",
            children: [
              { path: `/ecommerce/invoice/invoice1`, title: "Invoice-1", type: "link" },
              { path: `/ecommerce/invoice/invoice2`, title: "Invoice-2", type: "link" },
              { path: `/ecommerce/invoice/invoice3`, title: "Invoice-3", type: "link" },
              { path: `/ecommerce/invoice/invoice4`, title: "Invoice-4", type: "link" },
              { path: `/ecommerce/invoice/invoice5`, title: "Invoice-5", type: "link" },
              { path: `/ecommerce/invoice/invoice6`, title: "Invoice-6", type: "link" },
            ],
          },
          { path: `/ecommerce/cart`, title: "Cart", type: "link" },
          { path: `/ecommerce/wishlist`, title: "Wishlist", type: "link" },
          { path: `/ecommerce/checkout`, title: "Checkout", type: "link" },
          { path: `/ecommerce/pricing`, title: "Pricing", type: "link" },
        ],
      },
      { path: `/app/letterbox`, icon: "Message", title: "Letter Box", type: "link", id: 7 },
      {
        title: "Chat",
        id: 8,
        icon: "Chat",
        type: "sub",
        active: false,
        children: [
          { path: `/chat/privatechats`, type: "link", title: "Private Chat" },
          { path: `/chat/groupchat`, type: "link", title: "Group Chat" },
        ],
      },
      { path: `/app/bookmark`, icon: "Bookmark", type: "link", title: "Bookmark", id: 10 },
      { path: `/app/contacts`, title: "Contact", icon: "Contacts", type: "link", id: 11, active: false },
      { path: `/app/task`, icon: "Tick-square", type: "link", title: "Task" },
      { path: `/app/calendar`, icon: "Calendar", type: "link", title: "Calendar" },
      { path: `/app/socialapp`, icon: "Camera", type: "link", title: "Social App" },
      { path: `/app/todo`, icon: "Edit", type: "link", title: "Todo" },
      { path: `/app/searchresult`, icon: "Search", type: "link", title: "Search Result" },
    ],
  },
  {
    title: "Components",
    Items: [
      {
        title: "Buttons",
        icon: "More-box",
        id: 22,
        type: "link",
        active: false,
        path: `/buttons`,
      },
      {
        title: "Ui-Kits",
        icon: "Folder",
        id: 19,
        type: "sub",
        active: false,
        children: [
          { path: `/uikits/typography`, title: "Typography", type: "link" },
          { path: `/uikits/avatars`, title: "Avatars", type: "link" },
          { path: `/uikits/grid`, title: "Grid", type: "link" },
          { path: `/uikits/helperclasses`, title: "Helper Classes", type: "link" },
          { path: `/uikits/tagpills`, title: "Tag & Pills", type: "link" },
          { path: `/uikits/progress`, title: "Progress", type: "link" },
          { path: `/uikits/popover`, title: "Popover", type: "link" },
          { path: `/uikits/tooltip`, title: "Tooltip", type: "link" },
          { path: `/uikits/alert`, title: "Alert", type: "link" },
          { path: `/uikits/modal`, title: "Modal", type: "link" },
          { path: `/uikits/dropdown`, title: "Dropdown", type: "link" },
          { path: `/uikits/accordion`, title: "Accordion", type: "link" },
          { path: `/uikits/tabs`, title: "Tabs", type: "link" },
          { path: `/uikits/list`, title: "Lists", type: "link" },
        ],
      },

      {
        title: "Bonus-Ui",
        icon: "Ticket-star",
        id: 20,
        type: "sub",
        active: false,
        children: [
          { path: `/bonusui/scrollable`, title: "Scrollable", type: "link" },
          { path: `/bonusui/breadcrumb`, title: "Breadcrumb", type: "link" },
          { path: `/bonusui/pagination`, title: "Pagination", type: "link" },
          { path: `/bonusui/ribbons`, title: "Ribbons", type: "link" },
          { path: `/bonusui/treeview`, title: "Tree View", type: "link" },
          { path: `/bonusui/toasts`, title: "Toasts", type: "link" },
          { path: `/bonusui/rating`, title: "Rating", type: "link" },
          { path: `/bonusui/dropzone`, title: "Dropzone", type: "link" },
          { path: `/bonusui/tour`, title: "Tour", type: "link" },
          { path: `/bonusui/sweetalert2`, title: "SweetAlert2", type: "link" },
          { path: `/bonusui/reactstrapcarousel`, title: "Reactstrap Carousel", type: "link" },
          { path: `/bonusui/rangeslider`, title: "Range Slider", type: "link" },
          { path: `/bonusui/imagecropper`, title: "Image Cropper", type: "link" },
          { path: `/bonusui/basiccards`, title: "Basic Card", type: "link" },
          { path: `/bonusui/creativecards`, title: "Creative Card", type: "link" },
          { path: `/bonusui/timeline`, title: "Timeline", type: "link" },
        ],
      },

      {
        title: "Icons",
        icon: "Activity",
        id: 21,
        type: "sub",
        active: false,
        children: [
          { path: `/icons/flagicons`, title: "Flag Icon", type: "link" },
          { path: `/icons/fontawesomeicon`, title: "Fontawesome Icon", type: "link" },
          { path: `/icons/feathericon`, title: "Feather Icon", type: "link" },
          { path: `/icons/iconlysprite`, title: "Iconly Sprite", type: "link" },
          { path: `/icons/icoicon`, title: "Ico Icon", type: "link" },
          { path: `/icons/themifyicon`, title: "Themify Icon", type: "link" },
          { path: `/icons/wheathericon`, title: "Weather Icon", type: "link" },
        ],
      },
      {
        title: "Charts",
        icon: "Chart",
        type: "sub",
        id: 23,
        active: false,
        children: [
          { path: `/charts/apexchart`, type: "link", title: "Apex Chart" },
          { path: `/charts/chartjschart`, type: "link", title: "Chart JS Chart" },
        ],
      },
    ],
  },
  {
    title: "Forms & Table",
    Items: [
      {
        title: "Form Controls",
        active: false,
        icon: "Filter",
        type: "sub",
        children: [
          { title: "Base Inputs", type: "link", path: `/forms/formscontrols/baseinput` },
          { title: "Checkbox & Radio", type: "link", path: `/forms/formscontrols/radiocheckbox` },
          { title: "Input Groups", type: "link", path: `/forms/formscontrols/inputgroups` },
          { title: "Mega Option", type: "link", path: `/forms/formscontrols/megaoption` },
          { title: "Form Validation", type: "link", path: `/forms/formscontrols/formvalidation`, bookmark: true },
        ],
      },
      {
        title: "Form Widget",
        active: false,
        icon: "Scan",
        type: "sub",
        children: [
          { title: "Datepicker", type: "link", path: `/forms/formswidget/datepicker` },
          { title: "Touchspin", type: "link", path: `/forms/formswidget/touchspin` },
          { title: "Switch", type: "link", path: `/forms/formswidget/switch` },
          { title: "Typeahead", type: "link", path: `/forms/formswidget/typeahead` },
          { title: "Clipboard", type: "link", path: `/forms/formswidget/clipboard` },
        ],
      },
      {
        title: "Form Layout",
        active: false,
        icon: "Icon-plus",
        type: "sub",
        children: [
          { path: `/forms/formslayout/formwizard1`, title: "Form Wizard 1", type: "link" },
          { path: `/forms/formslayout/formwizard2`, title: "Form Wizard 2", type: "link" },
          { path: `/forms/formslayout/twofactor`, title: "Two Factor", type: "link" },
        ],
      },
      {
        title: "Table",
        icon: "Edit-line",
        id: 18,
        type: "sub",
        children: [
          {
            title: "Reactstrap Tables",
            type: "sub",
            children: [
              {
                title: "Basic Tables",
                type: "link",
                path: `/table/reactstraptable/basictable`,
              },
              {
                title: "Table Components",
                type: "link",
                path: `/table/reactstraptable/tablecomponent`,
              },
            ],
          },
          {
            title: "Data Tables",
            type: "sub",
            children: [
              { path: `/table/datatable/basicinit`, title: "Basic Init", type: "link" },
              { path: `/table/datatable/advanceinit`, title: "Advance Init", type: "link" },
              { path: `/table/datatable/api`, title: "API", type: "link" },
              { path: `/table/datatable/datasources`, title: "Data Source", type: "link" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Pages",
    Items: [
      {
        icon: "Paper-plus",
        id: 24,
        active: false,
        path: `/pages/samplepage`,
        title: "Sample Page",
        type: "link",
      },
      {
        title: "Others",
        icon: "Password",
        id: 25,
        type: "sub",
        children: [
          {
            title: "Error Pages",
            type: "sub",
            children: [
              { title: "Error 400", type: "link", path: `/errors/error400` },
              { title: "Error 401", type: "link", path: `/errors/error401` },
              { title: "Error 403", type: "link", path: `/errors/error403` },
              { title: "Error 404", type: "link", path: `/errors/error404` },
              { title: "Error 500", type: "link", path: `/errors/error500` },
              { title: "Error 503", type: "link", path: `/errors/error503` },
            ],
          },
          {
            title: "Authentication",
            type: "sub",
            children: [
              { title: "Login Simple", type: "link", path: `/authentication/loginsimple` },
              { title: "Login With Bg Image", type: "link", path: `/authentication/loginbgimage` },
              { title: "Login With Image Two", type: "link", path: `/authentication/loginwithimagetwo` },
              { title: "Login With Validation", type: "link", path: `/authentication/loginvalidation` },
              { title: "Login With Tooltip", type: "link", path: `/authentication/logintooltip` },
              { title: "Login With Sweetalert", type: "link", path: `/authentication/loginsweetalert` },
              { title: "Register Simple", type: "link", path: `/authentication/registersimple` },
              { title: "Register With Bg Image", type: "link", path: `/authentication/registerbgimage` },
              { title: "Register With Bg Two", type: "link", path: `/authentication/registerwithimagetwo` },
              { title: "Register Wizard", type: "link", path: `/authentication/registerwizard` },
              { title: "Unlock User", type: "link", path: `/authentication/unlockuser` },
              { title: "Forget Password", type: "link", path: `/authentication/forgetpassword` },
              { title: "Reset Password", type: "link", path: `/authentication/resetpassword` },
              { title: "Maintenance", type: "link", path: `/authentication/maintenance` },
              { title: "ACustomer", type: "link", path: `/authentication/acustomer` },
              { title: "Atest", type: "link", path: `/authentication/atest` },
            ],
          },
          {
            title: "Coming Soon",
            type: "sub",
            children: [
              { title: "Coming Simple", type: "link", path: `/comingsoon/comingsoonsimple` },
              { title: "Coming With Bg Video", type: "link", path: `/comingsoon/comingbgvideo` },
              { title: "Coming With Bg Image", type: "link", path: `/comingsoon/comingbgimg` },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Miscellaneous",
    Items: [
      {
        title: "Gallery",
        icon: "Gallery",
        id: 26,
        type: "sub",
        active: false,
        children: [
          { path: `/gallery/gallerygrids`, title: "Gallery Grids", type: "link" },
          { path: `/gallery/gallerygriddesc`, title: "Gallery Grid Desc", type: "link" },
          { path: `/gallery/masonrygallery`, title: "Masonry Gallery", type: "link" },
          { path: `/gallery/masonrywithdesc`, title: "Masonry With Desc", type: "link" },
          { path: `/gallery/hovereffect`, title: "Hover Effect", type: "link" },
        ],
      },
      {
        title: "Blog",
        icon: "Game",
        id: 27,
        type: "sub",
        active: false,
        children: [
          { path: `/blog/blogdetails`, title: "Blog Details", type: "link" },
          { path: `/blog/blogsingle`, title: "Blog Single", type: "link" },
          { path: `/blog/addpost`, title: "Add Post", type: "link" },
        ],
      },
      { path: `/miscellaneous/faq`, icon: "Danger", type: "link", active: false, title: "FAQ" },
      {
        title: "Job Search",
        icon: "Filter-2",
        id: 28,
        type: "sub",
        active: false,
        children: [
          { path: `/jobsearch/cardview`, title: "Cards View", type: "link" },
          { path: `/jobsearch/listview`, title: "List View", type: "link" },
          { path: `/jobsearch/jobdetail`, title: "Job Detail", type: "link" },
          { path: `/jobsearch/jobapply`, title: "Apply", type: "link" },
        ],
      },
      {
        title: "Learning",
        icon: "Work",
        id: 29,
        type: "sub",
        active: false,
        children: [
          { path: `/learning/learninglist`, title: "Learning List", type: "link" },
          { path: `/learning/detailcourse`, title: "Detailed Course", type: "link" },
        ],
      },
      {
        title: "Map",
        icon: "Discovery",
        type: "sub",
        id: 30,
        active: false,
        children: [
          { path: `/map/googlemap`, type: "link", title: "Google Map" },
          { path: `/map/leafletmap`, type: "link", title: "Leaflet Map" },
        ],
      },
      {
        title: "Editor",
        id: 31,
        icon: "Shield",
        type: "sub",
        active: false,
        children: [
          { path: `/editor/ckeditor`, type: "link", title: "CK Editor" },
          { path: `/editor/mdeeditor`, type: "link", title: "MDE Editor" },
          { path: `/editor/aceeditor`, type: "link", title: "ACE Editor" },
        ],
      },
      { id: 32, path: `/miscellaneous/knowledgebase`, icon: "Setting", type: "link", active: false, title: "Knowledgebase" },
      { id: 33, path: `/miscellaneous/supportticket`, icon: "Ticket", type: "link", active: false, title: "Support Ticket" },
    ],
  },*/
];
