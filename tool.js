// how to create a chain of getter of object for url path
class Path {
    constructor(path) {
        this.path = path
    }

    get(target, path) {
        if (path === '?path') {
            return this.path
        } else if (path === '?slashedPath') {
            return `${this.path}/`
        } else if (!(path in target)) {
            let p = ''
            if (this.path) {
                p = this.path
            }
            return new Proxy({}, new Path(`${p}/${path}`))
        }
    }
}

const PATH = new Proxy({}, new Path(""))

const chainPath = function (path) {
    return path['?path']
}

const chainSlashedPath = function (path) {
    return path['?slashedPath']
}

/*
> // a path which end without slash
> chainPath(PATH.home)
> "/home"
> chainPath(PATH.book.history)
> "/book/history"
 
> // a path end with slash
> chainSlashedPath(PATH.home)
> "/home/"

> // of course you can add pre path.
> // eg. add a common pre path "/cms":
> const PATH = new Proxy({}, new Path("/cms"))
*/

