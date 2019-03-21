const url = '../docs/photography.pdf';
let pdfDoc = null,
    pageNum = 2,
    pageIsRendering = false,
    pageNumIsPending = null;

const scale = 1.8,
      canvas = document.querySelector("#pdf-render"),
      ctx = canvas.getContext('2d');

//render the page
const renderPage = num => {
  pageIsRendering = true;

  //get Page
  pdfDoc.getPage(num).then(page=>{
    //Set scale
    const viewport = page.getViewport({scale});
    canvas.height =viewport.height;
    canvas.width = viewport.width;

    const renderCtx = {
      canvasContext : ctx,
      viewport
    }

    page.render(renderCtx).promise.then(()=>{
      pageIsRendering = false;

      if(pageNumIsPending !== null){
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });
    //Output the current page
    document.querySelector('#page-num').textContent = num;
  })
}

//Check for pages rendering
const queueRenderPage = num =>{
  if(pageIsRendering) {
    pageNumIsPending = num;
  }
  else{
    renderPage(num);
  }
}

//Show prev Page
const showPrevPage = ()=>{
  if(pageNum <= 1){
    return;
  }
  pageNum --;
  queueRenderPage(pageNum);
}

//Show next Page
const showNextPage = ()=>{
  if(pageNum >= pdfDoc.numPages){
    return;
  }
  pageNum ++;
  queueRenderPage(pageNum);
}

// Get Document
pdfjsLib.getDocument(url).promise.then(pdfDoc_=>{
  pdfDoc = pdfDoc_;
  
  document.querySelector("#page-count").textContent = pdfDoc.numPages;
  renderPage(pageNum);
})
  .catch(error => {
    //display error
    const div = document.createElement('div');
    div.className = "error";
    div.appendChild(document.createTextNode(error.message));
    document.querySelector('body').insertBefore(div, canvas);
    //remove the topbar
    document.querySelector('.top-bar').style.display = 'none';
  });

//button events
document.querySelector("#prev-page").addEventListener('click', showPrevPage);
document.querySelector("#next-page").addEventListener('click', showNextPage);