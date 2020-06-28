var elements = document.getElementsByTagName('*');
var symbs = /[{};()\[\]]/;

chrome.storage.sync.get('yesno', function(data) {
    var current = data.yesno;
    if(current == 1){
        transformtext();
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
