import { autobind } from "../decorators/autobind.js";
import { Draggable } from "../models/draggable.js";
import { Component } from "./component.js";
import { Project } from "./project.js";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get getPeople() {
    if (this.project.people > 1) {
      return `${this.project.people} people assigned`;
    }
    return `${this.project.people} person assigned`;
  }
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);

  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer?.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }
  @autobind
  dragEndHandler(_: DragEvent) {console.log("heeehh")}

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.getPeople;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
