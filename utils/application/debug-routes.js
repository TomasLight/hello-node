function print(path, layer) {
    if (layer.route) {
        const splittedPaths = split(layer.route.path);
        const args = path.concat(splittedPaths);
        const handler = print.bind(null, args);
        layer.route.stack.forEach(handler);
    }
    else if (layer.name === 'router' && layer.handle.stack) {
        const splittedPaths = split(layer.regexp);
        const args = path.concat(splittedPaths);
        const handler = print.bind(null, args);
        layer.handle.stack.forEach(handler);
    }
    else if (layer.method) {
        console.log('%s /%s',
            layer.method.toUpperCase(),
            path.concat(split(layer.regexp)).filter(Boolean).join('/'));
    }
}

function split(thing) {
    if (typeof thing === 'string') {
        return thing.split('/');
    }
    else if (thing.fast_slash) {
        return '';
    }
    else {
        const match = thing.toString()
            .replace('\\/?', '')
            .replace('(?=\\/|$)', '$')
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
        return match
            ? match[1].replace(/\\(.)/g, '$1').split('/')
            : '<complex:' + thing.toString() + '>';
    }
}

export { print };
