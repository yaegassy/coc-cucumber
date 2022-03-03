import {
  ExtensionContext,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
  workspace,
} from 'coc.nvim';
import path from 'path';

let client: LanguageClient;

export async function activate(context: ExtensionContext): Promise<void> {
  if (!workspace.getConfiguration('cucumber').get<boolean>('enable', true)) return;

  const serverModule = context.asAbsolutePath(path.join('lib', 'cucumber-language-server.js'));
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: 'file', language: 'cucumber' },
      { scheme: 'file', language: 'gherkin' },
    ],
  };

  client = new LanguageClient('cucumber', 'Cucumber Language Server', serverOptions, clientOptions);

  const disposeClient = client.start();
  context.subscriptions.push(disposeClient);
}
