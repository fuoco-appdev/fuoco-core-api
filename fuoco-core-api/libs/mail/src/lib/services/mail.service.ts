// deno-lint-ignore-file ban-ts-comment
// @ts-ignore
import {
  // @ts-ignore
  SmtpClient,
  // @ts-ignore
  ConnectConfig,
  // @ts-ignore
  ConnectConfigWithAuthentication,
  // @ts-ignore
} from 'https://deno.land/x/smtp@v0.7.0/mod.ts';
// @ts-ignore
import { Handlebars } from 'https://deno.land/x/handlebars@v0.8.0/mod.ts';

export class MailService {
  private readonly _handlebars: Handlebars;
  private readonly _config: ConnectConfig | ConnectConfigWithAuthentication;
  private readonly _tls: boolean;
  private readonly _client: SmtpClient;

  constructor(
    config: ConnectConfig | ConnectConfigWithAuthentication,
    tls: boolean
  ) {
    this._config = config;
    this._tls = tls;
    this._client = new SmtpClient();
    this._handlebars = new Handlebars();
  }

  public async sendFromHtmlAsync(
    fromEmail: string,
    toEmail: string,
    subject: string,
    htmlUri: string,
    context: Record<string, string>
  ): Promise<void> {
    const compiledHtml: string = await this._handlebars.render(
      htmlUri,
      context
    );

    if (!this._tls) {
      await this._client.connect(this._config);
    } else {
      await this._client.connectTLS(this._config);
    }

    await this._client.send({
      from: fromEmail,
      to: toEmail,
      subject: subject,
      html: compiledHtml,
      content: '',
    });

    await this._client.close();
  }

  public async sendFromContentAsync(
    fromEmail: string,
    toEmail: string,
    subject: string,
    content: string
  ): Promise<void> {
    if (!this._tls) {
      await this._client.connect(this._config);
    } else {
      await this._client.connectTLS(this._config);
    }

    await this._client.send({
      from: fromEmail,
      to: toEmail,
      subject: subject,
      content: content,
    });

    await this._client.close();
  }
}
