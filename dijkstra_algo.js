// Function to find shortest path from given source to all other nodes
const findShortestPath = (el) => {
  let visited = [];
  let unvisited = [];
  clearScreen();

  let source = Number(el.previousElementSibling.value);
  if (source >= cnt || isNaN(source)) {
    alert("Invalid source");
    return;
  }
  document.getElementById(source).style.backgroundColor = "grey";
  // console.log(source);
  let parent = [];
  parent[source] = -1;
  visited = [];
  for (i = 0; i < cnt; i++) unvisited.push(i);

  // Array containing cost of reaching i(th) node from source
  let cost = [];
  for (i = 0; i < cnt; i++) {
    i === source
      ? null
      : dist[source][i]
      ? (cost[i] = dist[source][i])
      : (cost[i] = Infinity);
  }
  cost[source] = 0; 

  // Array which will contain final minimum cost
  let minCost = [];
  minCost[source] = 0;

  // Repeating until all edges are visited
  while (unvisited.length) {
    let mini = cost.indexOf(Math.min(...cost));
    // console.log("draw", visited[visited.length-1],mini);
    visited.push(mini);
    unvisited.splice(unvisited.indexOf(mini), 1);

    // Relaxation of unvisited edges
    for (j of unvisited) {
      if (j === mini) continue;
      // console.log(mini, j);
      if (cost[j] > dist[mini][j] + cost[mini]) {
        minCost[j] = dist[mini][j] + cost[mini];
        cost[j] = dist[mini][j] + cost[mini];
        parent[j] = mini;
      } else {
        minCost[j] = cost[j];
        // parent[j] = source;
      }
    }
    cost[mini] = Infinity;
  }
  console.log("Minimum Cost", minCost);
  for (i = 0; i < cnt; i++)
    parent[i] === undefined ? (parent[i] = source) : null;
  // console.log(parent);
  indicatePath(parent, source, minCost);
};

const indicatePath = async (parentArr, src, minCost) => {
  document.getElementsByClassName("path")[0].innerHTML = "";
  for (i = 0; i < cnt; i++) {
    let p = document.createElement("p");
    p.innerText = "Node " + src + " to " + i + " --> ";
    if(minCost[i] !== Infinity){
      p.innerText += src;
      await printPath(parentArr, i, p);
    }
    else
      p.innerText += "No path exist";
    p.innerText += " Cost = " + minCost[i];
    document.getElementsByClassName("path")[0].appendChild(p);
  }
};

const printPath = async (parent, j, el_p) => {
  if (parent[j] === -1) return;
  await printPath(parent, parent[j], el_p);
  el_p.innerText = el_p.innerText + " " + j;

  document.getElementsByClassName("path")[0].style.padding = "1rem";
  document.getElementsByClassName("path")[0].appendChild(el_p);

  // console.log(j,parent[j]);

  if (j < parent[j]) {
    let tmp = document.getElementById(`line-${j}-${parent[j]}`);
    await colorEdge(tmp);
  } else {
    let tmp = document.getElementById(`line-${parent[j]}-${j}`);
    await colorEdge(tmp);
  }
};

const colorEdge = async (el) => {
  if (el.style.backgroundColor !== "aqua") {
    await wait(1000);
    el.style.backgroundColor = "aqua";
    el.style.height = "8px";
  }
};