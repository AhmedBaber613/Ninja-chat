class ChatUi {
  constructor(list){
    this.list = list;
  }

  clear(){
    this.list.innerHTML = '';
  }

  render(data){
    const when = dateFns.distanceInWordsToNow(
      data.created_at.toDate(),
      { addSuffix: true }
    );
    const html = `
      <li class="list-group-item">
        <span clas="username">
          ${ data.username }
        </span>

        <span clas="message">
        ${ data.message }
        </span>

        <div class="time">
          ${ when }
        </div>
      </li>
    `;

    this.list.innerHTML += html;
  }
}











//-6610693757324765085 lb
// -9138362943390022429
//6252469359599886901
//-6642668805005345128 best
//-330710628354125912
//2427644159904831378 new
//6021847302283421867