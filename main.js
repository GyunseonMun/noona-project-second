//유저가 값을 입력한다
//+버튼을 클릭하면, 할일이 추가된다
//delete버턴을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//진행중 끝남 탭을 누르면, 언더바가 이동한다
//진행중탭은 진행중 아이템만, 끝남탭은 끝남 아이템만 나온다.
//전체탭을 누름ㄴ 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click", addTask);

function addTask() {
  //console.log("clicked")
  let taskContent = taskInput.value;
  taskList.push(taskContent); //할일 리스트를 만들어준다 (배열)
  console.log(taskList);
  render();
}
//리스트에 그리기만하면됨
function render() {
  let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
      resultHTML += `<div class="task">
          <div>${taskList[i]}</div>
          <div>
              <button>Check</button>
              <button>Delete</button>
          </div>
      </div>`
    }
  document.getElementById("task-board").innerHTML = resultHTML;
}
