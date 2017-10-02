
let reloadHandler = null;

const handleDrop = (event) => {
  event.preventDefault();
  if ( reloadHandler === null )
    return;

  // If dropped items aren't files, reject them
  let dt = event.dataTransfer;
  if (dt.items) {
    // Use DataTransferItemList interface to access the file(s)
    if (dt.items[0] && dt.items[0].kind == "file") {
      let f = dt.items[0].getAsFile();
      reloadHandler( f );
    } 
  } else if (dt.files.length > 0) {
    // Use DataTransfer interface to access the file(s)
    reloadHandler( dt.files[0] ); 
  }
}

const cleanup = (event) => {
  // Remove all of the drag data
  let dt = event.dataTransfer;
  if (dt.items) {
    // Use DataTransferItemList interface to remove the drag data
    for (let i = 0; i < dt.items.length; i++) {
      dt.items.remove(i);
    }
  } else {
    // Use DataTransfer interface to remove the drag data
    event.dataTransfer.clearData();
  }
}

const registerDropHandler = (element, reload) => {
  element.ondrop = handleDrop;
  element.ondragover = (event) => event.preventDefault();
  element.ondragend = cleanup;
  reloadHandler = reload;
};

export default registerDropHandler;