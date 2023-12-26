import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TreeView } from '@lexical/react/LexicalTreeView';

const DebugPlugin = () => {
	const [editor] = useLexicalComposerContext();

	return (
		<TreeView
			viewClassName='tree-view-output'
			timeTravelPanelClassName='debug-timetravel-panel'
			timeTravelButtonClassName='debug-timetravel-button'
			timeTravelPanelSliderClassName='debug-timetravel-panel-slider'
			timeTravelPanelButtonClassName='debug-timetravel-panel-button'
			treeTypeButtonClassName='tree-type-button'
			editor={editor}
		/>
	);
};

export default DebugPlugin;
