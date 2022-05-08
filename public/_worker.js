const apiUrl = "https://engineeringpaper.herokuapp.com";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (!path.includes('.') && !path.slice(1).includes('/') && path !== "/") {
      const mainPage = await fetch(`${url.origin}/index.html`)
      return new HTMLRewriter().on('#prefetch', new AddSheet(path)).transform(mainPage);
    } else {
      return env.ASSETS.fetch(request);
    }
  }
};

class AddSheet {
  constructor(path) {
    this.path = path;
  }
  element(element) {
    element.setInnerContent(`prefetchedSheet = fetch('${apiUrl}${this.path}');`);
  }
}
