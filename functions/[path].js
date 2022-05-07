const apiUrl = "https://engineeringpaper.herokuapp.com";

export async function onRequest(context) {
  const path = context.params.path;

  const response = await fetch(context.request);
  
  return response;

  if (!path.contains('.') && path !== "") {
    const contentType = response.headers.get('Content-Type');

    // only attempt transform if response is html
    if (contentType.startsWith('text/html')) {
      return new HTMLRewriter().on('#prefetch', new AddSheet(path)).transform(response);
    } else {
      return response;
    }
  } else {
    return response;
  }
}

class AddSheet{
  constructor(path) {
    this.path = path;
  }
  element(element) {
    element.setInnerContent(`prefetchedSheet = fetch('${apiUrl}/${this.path}')`);
  }
}
