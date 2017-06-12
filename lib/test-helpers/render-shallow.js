import { createRenderer } from 'react-addons-test-utils';

const renderShallow = (element, context = {}, renderer = createRenderer()) => {
    renderer.render(element, context);

    const getOutput = () => renderer.getRenderOutput();

    return {
        output: getOutput(),
        rerender: getOutput,
        rerenderWithNewProps(newElement, newContext) {
            return renderShallow(newElement, newContext, renderer);
        }
    };
};

export default renderShallow;
