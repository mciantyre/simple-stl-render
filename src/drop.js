
let reloadHandler = null;

const handleDrop = (event) => {
  event.preventDefault();
  if ( reloadHandler === null )
    return;

  console.log("Drop");
    // If dropped items aren't files, reject them
    var dt = event.dataTransfer;
    if (dt.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i=0; i < dt.items.length; i++) {
      if (dt.items[i].kind == "file") {
        var f = dt.items[i].getAsFile();
        console.log("... file[" + i + "].name = " + f.name);
        reloadHandler( f );
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i=0; i < dt.files.length; i++) {
      console.log("... file[" + i + "].name = " + dt.files[i].name);
    }  
  }
}

const cleanup = (event) => {
  console.log("dragEnd");
  // Remove all of the drag data
  var dt = event.dataTransfer;
  if (dt.items) {
    // Use DataTransferItemList interface to remove the drag data
    for (var i = 0; i < dt.items.length; i++) {
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