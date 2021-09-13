/* eslint-disable @next/next/no-css-tags */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="iksm_sessionジェネレーター。SplanetをPCから見られます。iksm_session generation online."
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="fonts/fonts.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
