class UI {
	// we run this constructor every time we instantiate the class
	// since we have just 1 instance we can call the constructor without any parameters
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  
  // submit budget method
 submitBudgetForm()
 {
	  const value=this.budgetInput.value;
	  if(value==='' || value<0)
	  { // dynamically add the block
		 this.budgetFeedback.classList.add('showItem');
		 // showItem displays block;
		 // if we use textContent here it is going to show actual tags which is what we dont want
		this.budgetFeedback.innerHTML=`<p>Value cannot be negative</p>`;
	  // hide the value cant be negative;
    
	/*
	setTimeout(function()
	{
	this.budgetFeedback.classList.remove('showItem');	
	},4000)
	now this function is wrong as this is pointing to a global window object
	as when we create another function inside a function value of 'this' becomes global*/
	
	const self=this;
	
	setTimeout(function()
	{
	self.budgetFeedback.classList.remove('showItem');	
	},4000);
	}
	
// now i want to grab the value that i am placing in the budget form
// and now i want to make the value empty
	
	else
	{
	this.budgetAmount.textContent=value; // allocate value to budget amount
    this.budgetInput.value='';
    this.showBalance(); 	
	}
 } 
 
 // show balance
	showBalance()
	{
	const expense=this.totalExpense();	
	const total=parseInt(this.budgetAmount.textContent)-expense;
	// grab the value that is in the budget 
	this.balanceAmount.textContent=total;
	if(total<0)
	{
		this.balance.classList.remove('showGreen','showBlack');
		this.balance.classList.add('showRed');
	}
	else if(total>0)
	{
		this.balance.classList.add('showGreen');
		this.balance.classList.add('showRed','showBlack');
	}
	}
	// submit expense Form
	submitExpenseForm()
	{
		const expenseValue=this.expenseInput.value;
		const amountValue=this.amountInput.value;
	 if(expenseValue==='' || amountValue==='' || amountValue<0)
	 {
		this.expenseFeedback.classList.add('showItem');
		this.expenseFeedback.innerHTML=`<p>values cannot be empty or negative</p>`;
        const self=this;
  setTimeout(function()
  {
	 self.expenseFeedback.classList.remove('showItem'); 
  },4000)		
	 }
	 
	 else{
		let amount=parseInt(amountValue);
		this.expenseInput.value="";
		this.amountInput.value="";
		// we create an object
		let expense ={
			id:this.itemID,
			title:expenseValue,
			amount:amount,
		}
		// we iterate the id for distinction
		this.itemID++;
		this.itemList.push(expense);
		// point to whatever method we have...
		this.addExpense(expense);
		this.showBalance();
	 }
	}
	
	// add expense
	addExpense(expense)  
	{// first make it in HTML and then in js for div
	const div=document.createElement('div');
   div.classList.add('expense');
div.innerHTML=` <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">-${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>
`;
 this.expenseList.appendChild(div);  
	}
	// total expense() is basically going to calculate everything that we have in our list
	
	totalExpense()
	{
	let total=0;
    if(this.itemList.length>0)
	{
	total=this.itemList.reduce(function(acc,curr)
	{
	acc+=curr.amount;
	return acc;	
	},0)	
	}
this.expenseAmount.textContent=total;
return total;	
	}
	// show value
	
	// edit expense
editExpense(element)
	{ 
	  // we use dataset to access the ID
		let id=parseInt(element.dataset.id);
		let parent =element.parentElement.parentElement.parentElement;
		// remove from dom
		this.expenseList.removeChild(parent);
	 // remove from the list
let expense=this.itemList.filter(function(item){
	return item.id===id;
});	
// show value

	this.expenseInput.value = expense[0].title;
	this.amountInput.value = expense[0].amount;
	
// remove from the list
let tempList=this.itemList.filter(function(item){
	return item.id !==id;
}) 
this.itemList=tempList;
this.showBalance();

	}
	
	// delete expense
	deleteExpense(element)
	{
		// we use dataset to access the ID
		let id=parseInt(element.dataset.id);
		let parent =element.parentElement.parentElement.parentElement;
		// remove from dom
		this.expenseList.removeChild(parent);
	 // remove from the list
	 
	 let tempList=this.itemList.filter(function(item){
	return item.id !==id;
}) 
this.itemList=tempList;
this.showBalance();
	}
}
// create a new instance of a UI class
function eventListenters()  
{
// 3 variable that are going to hold the elements that we are getting back from the DOM
const budgetForm=document.getElementById('budget-form');	
const expenseForm=document.getElementById('expense-form');
const expenseList=document.getElementById('expense-list');

	//	new instance of UI class
const ui=new UI();

// budget form submit 
// pass event as parameter

// for the first two we are passing the event as we know for the form it is going to be automatically submitting and we would want to prevent that
budgetForm.addEventListener('submit',function(event)
{  
	event.preventDefault();
	ui.submitBudgetForm();
})

// expense form submit 
// pass event as parameter

expenseForm.addEventListener('submit',function(event)
{
	event.preventDefault();
	ui.submitExpenseForm();	
})

// expenseList click
// pass event as parameter

expenseList.addEventListener('click',function(event)
{ 
if(event.target.parentElement.classList.contains('edit-icon'))
{
ui.editExpense(event.target.parentElement);	
}
else if(event.target.parentElement.classList.contains('delete-icon'))
{
	ui.deleteExpense(event.target.parentElement);	
}		
})

}

document.addEventListener('DOMContentLoaded',function() // once this fires evenListeners() fires
{
eventListenters();	
})

