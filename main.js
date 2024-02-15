//유저가 값을 입력한다
//+버튼을 클릭하면, 할일이 추가된다
//delete버턴을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. check 버튼을 클릭하는 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로

//진행중, 끝남 탭을 누르면 언더바가 이동한다
//진행중탭은 진행중 아이템만, 끝남탭은 끝남 아이템만 나온다.
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let underLine = document.getElementById("under-line")
let taskList = [];
let mode = "all"
let filterList = []

addButton.addEventListener("click", addTask);

for(let i=1;i<tabs.length;i++){
  tabs[i].addEventListener("click", function(event){filter(event)})
  tabs[i].addEventListener("click", function(event){horizonIndicator(event)})
}
console.log(tabs)

// tabs.forEach((menu) => menu.addEventListener("click", (e) => horizonIndicator(e)))
// console.log(tabs)
function horizonIndicator(e) {
  underLine.style.left = e.target.offsetLeft + "px"
  underLine.style.width = e.target.offsetWidth + "px"
  underLine.style.top = e.target.offsetTop + e.target.offsetHeight -4 + "px"
  console.log("underLine.style.width값", underLine.style.width) //64,80,64
}

function addTask() {
  //console.log("clicked")
  let task = {
    id:randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  };
  taskList.push(task); //할일 리스트를 만들어준다 (배열)
  console.log(taskList);
  render();
}
//taskList를 그리기만하면됨, HTML을 다시 그려주는 역할, 무엇을? taskList를
function render() {
  // 1. 내가 선택한 탭에 따라서
  let list = []
  if(mode === "all"){
    list = taskList
  }else if(mode === "ongoing"){
    list = filterList
  }else if(mode === "done"){
    list = filterList
  }
  // 2. 리스트를 달리 보여준다
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if(list[i].isComplete==true){//taskList를 그려줄텐데 true이면
        //console.log("here"); //task-done을 추가한다. 프린트한다
        resultHTML += `<div class="task">
          <div class="task-done">${list[i].taskContent}</div>
          <div>
              <button onclick="toggleComplete('${list[i].id}')">Check</button>
              <button onClick="deleteTask('${list[i].id}')">Delete</button>
          </div>
      </div>`
    } else {
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
  </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  //console.log("id:",id);//console.log("check됬음")
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id== id){
      taskList[i].isComplete = !taskList[i].isComplete;//taskList[i].isComplete = true;
        break;
      }
  }
  render() 
  console.log(taskList)
}

function deleteTask(id) {
  //console.log('삭제하자', id)
  for(i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList.splice(i,1)
      break;
    }
  }
  console.log("할일:",taskList)
  render() //값이 업데이트 되면 UI도 업데이트
}

function filter(event){
  //console.log("filter",event.target.id)
  mode = event.target.id
  filterList = []
  if(mode === "all"){
    //전체 리스트를 보여준다
    render()
  }else if(mode === "ongoing"){
    //진행중인 아이템을 보여준다.
    //task.isComplete=false
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete === false){
        filterList.push(taskList[i])
      }
    }
    render()
    console.log("진행중",filterList)
  }else if(mode === "done"){
    //끝나는 케이스
    //task.isComplete=true
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete === true){
        filterList.push(taskList[i])  
      }
    }
    render()
    console.log("끝남",filterList)
  }
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}