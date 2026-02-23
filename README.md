1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
 --> getElementById => select a single element by uniqe id.
 --> getElementByClassName => select multiple element by class .
 --> querySelector => select the element that he found first.
 --> querySelectorAll =>select all matched element .


2.How do you create and insert a new element into the DOM?   
--> create a new element by using   const div = document.createElement('div');
--> insert that element by calling   .appendChild(div);

3.What is Event Bubbling? And how does it work?
--> Like when a element triggered by an event , he slowly goes up through parent element , its kinda look like bubble. XD 

4. What is Event Delegation in JavaScript? Why is it useful?
   --> Event delegation is like set a listener on parent element to get event access on her child element . usefull bcz its easy to get child elements  , understable  & looks oriented.

5.What is the difference between preventDefault() and stopPropagation() methods?
--> recently i just learn that preventDefault() is stoping the browser autometic work, 
and stopPropagation() used for stop children going up to the parents.
  
