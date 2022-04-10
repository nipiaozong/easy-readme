'use babel';

import EasyReadmeView from './easy-readme-view';
import { CompositeDisposable } from 'atom';

export default {

  easyReadmeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.easyReadmeView = new EasyReadmeView(state.easyReadmeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.easyReadmeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'easy-readme:addInDefaultFormat': () => this.addInDefaultFormat()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.easyReadmeView.destroy();
  },

  serialize() {
    return {
      easyReadmeViewState: this.easyReadmeView.serialize()
    };
  },

  addInDefaultFormat() {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      editor.insertText(
         '# Project Title\n' +
          '\n' +
          'A brief description of what this project does and who it\'s for.\n' +
          '\n' +
          '\n' +
          '## Installation\n' +
          '\n' +
          'Install my-project with `npm`\n' +
          '\n' +
          '```bash\n' +
          '  npm install my-project\n' +
          '  cd my-project\n' +
          '```\n' +
          '\n' +
          '## Usage/Examples\n' +
          '\n' +
          '```javascript\n' +
          'import Component from \'project\'\n' +
          '\n' +
          'function App() {\n' +
          '  return <Component />\n' +
          '}\n' +
          '```\n' +
          '\n' +
          '\n' +
          '## Badges\n' +
          '\n' +
          '![MIT License](https://img.shields.io/github/license/nipiaozong/Easy-README)\n' +
          '\n' +
          'You can add badges from somewhere like: [shields.io](https://shields.io/).\n' +
          '\n' +
          '\n' +
          '## Related\n' +
          '\n' +
          '[Another README](https://.../README.md)\n' +
          '\n' +
          'Here are some related projects.\n' +
          '\n' +
          '\n' +
          '## Authors\n' +
          '\n' +
          '- [@...](https://www.github.com/...)\n' +
          '- [@...](https://www.github.com/...)\n' +
          '- [@...](https://www.github.com/...)\n' +
          '\n' +
          '\n' +
          '## Contributing\n' +
          '\n' +
          'Contributions are always welcome!\n' +
          '\n' +
          'See `contributing.md` for ways to get started.\n' +
          '\n' +
          'Please adhere to this project\'s `code of conduct`.\n' +
          '\n' +
          '\n' +
          '## License\n' +
          '\n' +
          '[MIT](LICENSE) © ...\n' +
          '\n' +
          '\n'
      )
    }
  }

};
