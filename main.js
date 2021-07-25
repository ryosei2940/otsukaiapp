const firebaseConfig = {
    apiKey: "AIzaSyBzZ--op2uDW6O-DicT1r5Lvl-Gv-YIfTM",
    authDomain: "shopping312-b3e16.firebaseapp.com",
    projectId: "shopping312-b3e16",
    storageBucket: "shopping312-b3e16.appspot.com",
    messagingSenderId: "774420174150",
    appId: "1:774420174150:web:2bc8333aed6fb9b5bc4147",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
// console.log("db");
var idArray = [];
var form = $(".otsukai_form");
function getNowDatetime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const min = ("0" + date.getMinutes()).slice(-2);
    return `${year}/${month}/${day}${hour}:${min}`;
}
$(".send").on("click", function (e) {
    e.preventDefault();
    var calender = form[0][0].value;
    var milk = $("input[name='milk']:checked").val();
    var egg = $("input[name='egg']:checked").val();
    db.collection("chat")
        .add({
            calender: calender,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            milk: milk,
            egg: egg,
            clocktime: getNowDatetime(),
        })
        // .then(function(){処理})でdbへの保存が成功した時の処理を書ける
        // .catch(function(){処理})でdbへの保存が失敗した時の処理を書ける
        .then(function (doc) {
            console.log(doc);
            window.location.href = "otsukai4.html";
        })
        .catch(function (error) {
            console.log(error);
        });
});
db.collection("chat")
    .orderBy("clocktime", "desc")
    .onSnapshot(function (querySnapshot) {
        let str = "";
        idArray = querySnapshot;
        querySnapshot.forEach(function (doc) {
            const id = doc.id;
            const data = doc.data();
            str += '<div id="' + id + '">';
            str += "<p>" + data.clocktime + "</p>";
            str += "<p>" + data.calender + "</p>";
            str += "<p>" + data.milk + "</p>";
            str += "<p>" + data.egg + "</p>";
            str += "</div>";
            str += "<hr>";
        });
        $(".output").html(str);
    });