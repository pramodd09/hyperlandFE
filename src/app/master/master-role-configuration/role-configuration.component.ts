import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  Administrator: {
    Master: {
     Firm :null,
     'City':null,
     'Project':null,
     'Block':null,
     'Property Type':null,
     'PLC':null,
     'Location':null,
     'Bank':null,
     'Additional Charges':null,
     'Investor':null,
     'Investment':null,
     'Land':null     
    },
    Report:{
      'Booking':null,
      'Customer':null,
      'Trasnaction':null,
      'Agent Leg':null,
    },
    Accounts:{
      'Booking':null,
      'Farmer Payment':null,
      'Agent Payment':null,
      'Installment':null,
      'Daily Expense':null,
      'Registry':null,
      'Verify Transaction': null,
    },
    User:{
      'Associate':null,
    }
},
Agent: {
  Master: {
   'Firm' :null,
   'City':null,
   'Project':null,
   'Block':null,
   'Property Type':null,
   'PLC':null,
   'Location':null,
   'Bank':null,
   'Additional Charges':null,
   'Investor':null,
   'Investment':null,
   'Land':null     
  },
  Report:{
    'Booking':null,
    'Customer':null,
    'Trasnaction':null,
    'Agent Leg':null,
  },
  Accounts:{
    'Booking':null,
    'Farmer Payment':null,
    'Agent Payment':null,
    'Installment':null,
    'Daily Expense':null,
    'Registry':null,
    'Verify Transaction': null,
  },
  User:{
    'Associate':null,
  }
},
Office: {
  Master: {
   'Firm' :null,
   'City':null,
   'Project':null,
   'Block':null,
   'Property Type':null,
   'PLC':null,
   'Location':null,
   'Bank':null,
   'Additional Charges':null,
   'Investor':null,
   'Investment':null,
   'Land':null     
  },
  Report:{
    'Booking':null,
    'Customer':null,
    'Trasnaction':null,
    'Agent Leg':null,
  },
  Accounts:{
    'Booking':null,
    'Farmer Payment':null,
    'Agent Payment':null,
    'Installment':null,
    'Daily Expense':null,
    'Registry':null,
    'Verify Transaction': null,
  },
  User:{
    'Associate':null,
  }
},
Customer: {
  Master: {
   'Firm' :null,
   'City':null,
   'Project':null,
   'Block':null,
   'Property Type':null,
   'PLC':null,
   'Location':null,
   'Bank':null,
   'Additional Charges':null,
   'Investor':null,
   'Investment':null,
   'Land':null     
  },
  Report:{
    'Booking':null,
    'Customer':null,
    'Trasnaction':null,
    'Agent Leg':null,
  },
  Accounts:{
    'Booking':null,
    'Farmer Payment':null,
    'Agent Payment':null,
    'Installment':null,
    'Daily Expense':null,
    'Registry':null,
    'Verify Transaction': null,
  },
  User:{
    'Associate':null,
  }
},
};

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: object, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'tree-checklist-example',
  templateUrl: './role-configuration.component.html',
  styleUrls: ['./role-configuration.component.scss'],
  providers: [ChecklistDatabase]
})
export class TreeChecklistExample {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  constructor(private database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode() {
   
    var selectedList = this.checklistSelection.selected;
    console.log(selectedList);
    var selecttionList2 = [];
    var me = this;
   
    var tempParent = [];
    var tempGrandParent = [];
    selectedList.forEach(function(node){
    var temp = []; 
    temp.push(node.item);
    do{       
        console.log(node.item);
        var parentNode = me.getParent(node);
        if(parentNode && parentNode.level == 1 )
        {
         if(tempParent.length == 0)
          {
            var a = {};        
            a[parentNode.item] = temp;
            tempParent.push(a);
          }
        else{
          for(var j = 0;j < tempParent.length; j++)
          {
              if(tempParent[j][parentNode.item])
              {
                tempParent[j][parentNode.item].push(temp[0]);
              }
           }      
          }                    
        }
        if(parentNode && parentNode.level == 0)
        {
          if(tempGrandParent.length == 0)
          {
            var a = {};        
            a[parentNode.item] = tempParent;
            tempGrandParent.push(a);
          }
          else{
          for(var j = 0;j < tempGrandParent.length; j++)
          {
              if(tempGrandParent[j][parentNode.item])
              {
                tempGrandParent[j][parentNode.item][tempParent[0].item].push(tempParent[0].item);
              }
           }      
          }           
        }
        node = parentNode;
      } while (node != null)
      console.log(tempGrandParent);
    });
   
  
  } 
  
  getParent(node: TodoItemFlatNode) {
    const { treeControl } = this;
    const currentLevel = treeControl.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = treeControl.dataNodes[i];

      if (treeControl.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
  }
}