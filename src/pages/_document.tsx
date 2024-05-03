import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";

class MyDocument extends Document {
  static nonce: string | string[] | undefined;
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    this.nonce = ctx.req?.headers["x-nonce"];
    return await Document.getInitialProps(ctx);
  }
  render() {
    const nonce =
      MyDocument.nonce && typeof MyDocument.nonce === "string"
        ? MyDocument.nonce
        : undefined;
    const csp = `object-src 'none'; base-uri 'none'; script-src 'nonce-${nonce}' ${process.env.NODE_ENV === 'development' ? `'unsafe-eval'` : ''};`;
    return (
      <Html lang="en">
        <Head nonce={nonce}>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
