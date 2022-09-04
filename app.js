
function uploadFiles() {
    var files = document.getElementById('file').files;
    if(files.length==0){
        alert("Please first choose or drop any file(s)...");
        return;
    }
    var filenames="";
    for(var i=0;i<files.length;i++){
        filenames+=files[i].name+"\n";
    }
    alert("Selected file(s) :\n____________________\n"+filenames);
}


var fileName = "";


"use strict";

var $result = $("#download_form");
$("#file").on("change", function(evt) {
    // remove content
    $result.html("");
    // be sure to show the results
    $("#result_block").removeClass("hidden").addClass("show");

    // Closure to capture the file information.
    function handleFile(f) {
        fileName=f;
        var $title = $("<h4>", {
            text : f.name
        });
        var $fileContent = $("<ul>");
        $result.append($title);
        $result.append($fileContent);

        var dateBefore = new Date();
        JSZip.loadAsync(f)                                   // 1) read the Blob
            .then(function(zip) {
                var dateAfter = new Date();
                $title.append($("<span>", {
                    "class": "small",
                    text:" (loaded in " + (dateAfter - dateBefore) + "ms)"
                }));

                zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
                    const blob = new Blob(relativePath);
                    $fileContent.append($(
                    `
                    <li>
                        <a download="${zipEntry.name}" href="${URL.createObjectURL(blob)}" >${zipEntry.name}</a>
                    </li>
                    `
                    ));
                });
            }, function (e) {
                $result.append($("<div>", {
                    "class" : "alert alert-danger",
                    text : "Error reading " + f.name + ": " + e.message
                }));
            });
    }

    var files = evt.target.files;
    for (var i = 0; i < files.length; i++) {
        handleFile(files[i]);
    }
});








// function urlToPromise(url) {
//     return new Promise(function(resolve, reject) {
//         JSZipUtils.getBinaryContent(url, function (err, data) {
//             if(err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }

// $("#download_form").on("submit", function () {
//     resetMessage();

//     var zip = new JSZip();

//     // find every checked item
//     $(this).find(":checked").each(function () {
//         var $this = $(this);
//         var url = $this.data("url");
//         var filename = url.replace(/.*\//g, "");
//         zip.file(filename, urlToPromise(url), {binary:true});
//     });

//     // when everything has been downloaded, we can trigger the dl
//     zip.generateAsync({type:"blob"}, function updateCallback(metadata) {
//         var msg = "progression : " + metadata.percent.toFixed(2) + " %";
//         if(metadata.currentFile) {
//             msg += ", current file = " + metadata.currentFile;
//         }
//         showMessage(msg);
//         updatePercent(metadata.percent|0);
//     })
//         .then(function callback(blob) {

//             // see FileSaver.js
//             // saveAs(blob, fileName);

//             showMessage("done !");
//         }, function (e) {
//             showError(e);
//         });

//     return false;
// });




// /**
//  * Reset the message.
//  */
//  function resetMessage () {
//     $("#result")
//         .removeClass()
//         .text("");
// }
// /**
//  * show a successful message.
//  * @param {String} text the text to show.
//  */
// // eslint-disable-next-line no-unused-vars
// function showMessage(text) {
//     resetMessage();
//     $("#result")
//         .addClass("alert alert-success")
//         .text(text);
// }
// /**
//  * show an error message.
//  * @param {String} text the text to show.
//  */
// function showError(text) {
//     resetMessage();
//     $("#result")
//         .addClass("alert alert-danger")
//         .text(text);
// }
// /**
//  * Update the progress bar.
//  * @param {Integer} percent the current percent
//  */
// // eslint-disable-next-line no-unused-vars
// function updatePercent(percent) {
//     $("#progress_bar").removeClass("hide")
//         .find(".progress-bar")
//         .attr("aria-valuenow", percent)
//         .css({
//             width : percent + "%"
//         });
// }

// // if(!JSZip.support.blob) {
// //     showError("This demo works only with a recent browser !");
// // }




function downloadURI(uri, name) 
{
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}