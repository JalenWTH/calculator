function NumberButton(props){ //click handler is passed as prop from the Calculator
  return(
    <button className='square' onClick={() => props.onClick(props.number)}>
      {props.number}
    </button>
  );
}

function OperatorButton(props){
  return(
    <button className={props.style} onClick={() => props.onClick()}>
      {props.operation}
    </button>
  );
}

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value_1:"",
      value_2:"",
      operation:null,
      display:null,
      result:null
    }
  }
  
  renderNumberbutton(x){ //This function will render each number button using the number it gets passed as a prop
    return(
      <NumberButton 
        className='square'
        number={x} 
        key={x}
        onClick={() => this.numberClick(x)}
      /> 
    ); 
  }
  
  renderOperatorbutton(y){ //function will render each operator button with the operator it gets passed as a prop
    if (this.state.operation == y){ // If this button is the operation that was chosen, highlight it
      return(
        <OperatorButton 
          operation={y} 
          style='square_highlighted'
          onClick={() => this.operatorClick(y)}
        />
      );
    } else {
      return(
        <OperatorButton 
          operation={y} 
          style='square'
          onClick={() => this.operatorClick(y)}
        />
      );
    }
  }
  
  numberClick(x){ 
    let value_1=this.state.value_1
    let value_2=this.state.value_2
    
    if (this.state.operation==null){ //if an operation hasn't been chosen, update value_1
      let new_value_1=''+value_1+x
      
      this.setState({
        value_1:new_value_1,
        display:new_value_1
      })
    } else if (this.state.operation!=null) { //if an operation has been chosen, update value_2
        let new_value_2=''+value_2+x
      
        this.setState({ 
          value_2:new_value_2,
          display:new_value_2
        })
    }
  }
  
  operatorClick(y){
    if (this.state.operation==null){
      this.setState({
        operation:y,
        display:this.state.value_2
      })
    }
  }
  
  resetCalculator(){
    this.setState({
      value_1:'',
      value_2:'',
      operation:null,
      display:null
    })
  }
  
  evaluate(){
    let operation=this.state.operation
    let value_1=Number(this.state.value_1)
    let value_2=Number(this.state.value_2)
    let result
    
    if (operation=='+'){
      result = value_1+value_2
    } else if (operation=='-'){
        result=value_1-value_2
    } else if (operation=='x'){
        result=value_1*value_2
    } else if (operation=='/'){
      result=value_1/value_2
    }
    this.setState({
      result:result,
      display:result
    })
  }
  
  
  render(){
    const array=[9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    const numberButtons=array.map(x => this.renderNumberbutton(x)) //renders the number buttons from this array instead of hard coding each one 
    
    return(
      <div>
        <div className='screen'>
          {this.state.display}
        </div>
        
        
        <div>
          {numberButtons.slice(0,3)}
           {this.renderOperatorbutton('+')}
        </div>

        <div>
          {numberButtons.slice(3,6)}
          {this.renderOperatorbutton('-')}
        </div>

        <div>
          {numberButtons.slice(6, 9)}
          {this.renderOperatorbutton('x')}
        </div>
        
        <div>
          <button 
            className='square'
            onClick={() => this.evaluate()}
          >
            =
          </button>
          {numberButtons.slice(9)}
          
          <button 
            className='square'
            onClick={() => this.resetCalculator()}
          >
            clr
          </button>
 
          {this.renderOperatorbutton('/')}
        </div>
      </div>
    );
  }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<Calculator />)
