//유저가 값을 입력한다
//+버튼을 클릭하면, 할일이 추가된다
//delete버턴을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. check 버튼을 클릭하는 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로

//진행중 끝남 탭을 누르면, 언더바가 이동한다
//진행중탭은 진행중 아이템만, 끝남탭은 끝남 아이템만 나온다.
//전체탭을 누름ㄴ 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click", addTask);

function addTask() {
  //console.log("clicked")
  let task = {
    id:randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task); //할일 리스트를 만들어준다 (배열)
  console.log(taskList);
  render();
}
//taskList를 그리기만하면됨
function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if(taskList[i].isComplete==true){//taskList를 그려줄텐데 true이면
        //console.log("here"); //task-done을 추가한다. 프린트한다
        resultHTML += `<div class="task">
          <div class="task-done">${taskList[i].taskContent}</div>
          <div>
              <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
              <button onClick="deleteTask('${taskList[i].id}')">Delete</button>
          </div>
      </div>`
    } else {
      resultHTML += `<div class="task">
      <div>${taskList[i].taskContent}</div>
      <div>
          <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
          <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
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
  let a
  for(i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
      a = taskList.splice(i,1)
      break;
    }
  }
  console.log("삭제한아이템:",a)
  console.log("삭제된배열:",taskList)
  render() //값이 업데이트 되면 UI도 업데이트
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}