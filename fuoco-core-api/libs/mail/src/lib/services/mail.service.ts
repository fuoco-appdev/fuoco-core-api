// deno-lint-ignore-file ban-ts-comment
// @ts-ignore
import { SMTPClient, ClientOptions } from "https://deno.land/x/denomailer@1.5.0/mod.ts";
// @ts-ignore
import { Handlebars } from "https://deno.land/x/handlebars@v0.8.0/mod.ts";

export class MailService {
    private readonly _client: SMTPClient;
    private readonly _handlebars: Handlebars;

    constructor(config: ClientOptions) {
        this._client = new SMTPClient(config);
        this._handlebars = new Handlebars();
    }

    public async sendAsync(
        fromEmail: string,
        toEmail: string,
        subject: string,
        content: string,
        htmlUri: string,
        context: Record<string, string>
    ): Promise<void> {
        const compiledHtml: string = await this._handlebars.render(htmlUri, context);

        await this._client.send({
            from: fromEmail,
            to: toEmail,
            subject: subject,
            content: content,
            html: compiledHtml,
        });
          
        await this._client.close();
    } 
}