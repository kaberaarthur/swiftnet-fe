import NoSsr from "@/utils/NoSsr";
import type { Metadata } from "next";
import "../.././src/index.scss";
import MainProvider from "./MainProvider";
import { I18nProvider } from "./i18n/i18n-context";
import { detectLanguage } from "./i18n/server";

export const metadata: Metadata = {
  title: "Swiftnet - ISP Hub",
  description: "An Intiuitive ISP Management System",
};
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

const lng = await detectLanguage();

  return (
    <I18nProvider language={lng}>
    <html lang={lng}>
      <head>
        <link rel="icon" href="/assets/images/favicon/favicon.png" type="image/x-icon" />
        <link rel="shortcut icon" href="/assets/images/favicon/favicon.png" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAjeJEPREBQFvAIqDSZliF0WjQrCld-Mh0"></script>
        <script type="text/javascript">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "t1chsnyq8n");
          `}
        </script>
      </head>
      <body>
        <NoSsr>
          <MainProvider>{children}</MainProvider>
        </NoSsr>
      </body>
    </html>
    </I18nProvider>
  );
}
