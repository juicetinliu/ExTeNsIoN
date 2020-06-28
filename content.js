var elements = document.getElementsByTagName('*');
var symbs = /[{};()\[\]]/;

chrome.storage.sync.get('yesno', function(data) {
    var current = data.yesno;
    if(current == 1){
        transformtext();
        transformtype();
    }
});

function transformtext(){
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var text = node.nodeValue;

                if(!containsSymb(text)){
                    var replacedText = "";
                    for (var t = 0; t < text.length; t++) {
                        if(isLetter(text.charAt(t))){
                            if(t % 2 == 0){
                                replacedText += text.charAt(t).toUpperCase();
                            }else{
                                replacedText += text.charAt(t).toLowerCase();
                            }
                        }else{
                            replacedText += text.charAt(t);
                        }
                    }
                    

                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                }else{
                    
                }
            }
        }
    }
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function containsSymb(str) {
    return symbs.test(str);
}

function transformtype(){
    var inputs = document.getElementsByTagName('input');
    var selectedimp;
    for (var i = 0; i < inputs.length; i++) {
        var thisinput = inputs[i];
        if(thisinput.type == 'text' || thisinput.type == 'search'){
            thisinput.addEventListener("focus", function(event){
                console.log(event);
                selectedimp = event.target;
            });
            thisinput.addEventListener("keydown", function(event){
                console.log(event.keyCode);
                if(isLetter(String.fromCharCode(event.keyCode))){
                    event.preventDefault();
                    addtoinput(selectedimp,String.fromCharCode(event.keyCode));
                    console.log(keyCounter);
                }
            });
        }
    }
    var keyCounter = 0;

    function addtoinput(inp, key){
        if(keyCounter == 1){
            inp.value += key.toUpperCase();
            keyCounter = 0;
        }else{
            inp.value += key.toLowerCase();
            keyCounter = 1;
        }
    }
}