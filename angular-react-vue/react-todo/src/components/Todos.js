import React, { Component } from 'react';

import { Consts } from '../engine/index';
import TodoItem from './TodoItem';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowShowing: Consts.appStatus.ALL_TODOS,
      editing: null,
      newTodo: ''
    };
  }

  /**
   * 执行场景
   * 在`render()`方法之前
   * 解释
   * 1 因为 componentWillMount 是在 render 之前执行，所以在这个方法中`setState`不会发生重新渲染(re-render);
   * 2 这是服务端渲染(`server render`)中唯一调用的钩子(hook);
   * 3* 通常情况下，推荐用`constructor()`方法代替;
   */
  componentWillMount = () => {
    console.log('start componentWillMount:', new Date());
    // 不建议使用
    console.log('end componentWillMount:', new Date());
  }

  /**
   * 执行场景
   * 在`render()`方法之后
   * 解释
   * 1 这个方法会在render()之后立即执行；
   * 2 这里可以对DOM进行操作，这个函数之后 ref 变成实际的DOM;
   * 3* 这里可以加载服务器数据，并且如果使用了redux之类的数据服务，这里可以出发加载服务器数据的action;
   * 4 这里可以使用`setState()`方法触发`重新渲染(re-render)`;
   */
  componentDidMount = async () => {
    console.log('start componentDidMount:', new Date());
    // redux 操作, 获取服务器数据
    // 对于 component 而已就是通过回调,通知父组件刷新
    // await Timer.sleep(1000);
    console.log('end componentDidMount:', new Date());
  }

  /**
   * 执行场景
   * 在已经挂在的组件(mounted component)接收到新props时触发;
   * 简单的说是在除了第一次生命周期(componentWillMount -> render -> componentDidMount)之后的生命周期中出发;
   * 解释
   * 1 如果你需要在`props`发生变化(或者说新传入的props)来更新`state`，你可能需要比较`this.props`和`nextProps`, 然后使用`this.setState()`方法来改变`this.state`;
   * 注意
   * 1 React 可能会在 props 传入时即使没有发生改变的时候也发生重新渲染, 所以如果你想自己处理改变，请确保比较props当前值和下一次值; 这可能造成组件重新渲染;
   * 2 如果你只是调用`this.setState()`而不是从外部传入`props`, 那么不会触发`componentWillReceiveProps(nextProps)`函数；这就意味着: `this.setState()`方法不会触发`componentWillReceiveProps()`, `props`的改变或者`props`没有改变才会触发这个方法;
   * 3* 这里只建议有必要的 this.setState操作,不应该有 redux 操作,复杂的业务逻辑
   */
  componentWillReceiveProps = () => {
    console.log('start componentWillReceiveProps:', new Date());
    // 只有需要更新 state 时才应该实现
    // this.setState();
    console.log('end componentWillReceiveProps:', new Date());
  }

  /**
   * 执行场景
   * 在接收到新`props`或`state`时，或者说在`componentWillReceiveProps(nextProps)`后触发
   * 解释
   * 在接收新的`props`或`state`时确定是否发生重新渲染，默认情况返回`true`，表示会发生重新渲染
   * 注意
   * 1 这个方法在首次渲染时或者`forceUpdate()`时不会触发;
   * 2 这个方法如果返回`false`, 那么`props`或`state`发生改变的时候会阻止子组件发生重新渲染;
   * 3 目前，如果`shouldComponentUpdate(nextProps, nextState)`返回`false`, 那么`componentWillUpdate(nextProps, nextState)`, `render()`, `componentDidUpdate()`都不会被触发;
   * 4 `Take care`: 在未来，React可能把`shouldComponentUpdate()`当做一个小提示(hint)而不是一个指令(strict directive)，并且它返回`false`仍然可能触发组件重新渲染(re-render);
   * Good Idea
   * 在React 15.3以后, `React.PureComponent`已经支持使用，个人推荐，它代替了(或者说合并了)`pure-render-mixin`，实现了`shallowCompare()`。[扩展阅读](在React.js 中使用PureComponent的重要性和使用方式 - 众成翻译)
   */
  shouldComponentUpdate = () => {
    console.log('start shouldComponentUpdate:', new Date());
    // 如果大量重复刷新,建议实现优化
    console.log('end shouldComponentUpdate:', new Date());

    return true;
  }

  /**
   * 执行场景
   * 在`props`或`state`发生改变或者`shouldComponentUpdate(nextProps, nextState)`触发后, 在`render()`之前
   * 解释
   * 1 这个方法在组件初始化时不会被调用;
   * 注意
   * 1 **千万不要在这个函数中调用`this.setState()`方法.**;
   * 2 如果确实需要响应`props`的改变，那么你可以在`componentWillReceiveProps(nextProps)`中做响应操作;
   * 3 如果`shouldComponentUpdate(nextProps, nextState)`返回`false`，那么`componentWillUpdate()`不会被触发;
   * 4* 暂时没想到应用场景,不建议使用
   */
  componentWillUpdate = () => {
    console.log('start componentWillUpdate:', new Date());
    // 暂时没想到应用场景,不建议使用
    console.log('end componentWillUpdate:', new Date());
  }

  /**
   * 执行场景
   * 在发生更新或`componentWillUpdate(nextProps, nextState)`后
   * 解释
   * 1 该方法不会再组件初始化时触发;
   * 2 使用这个方法可以对组件中的DOM进行操作;
   * 3* 只要你比较了`this.props`和`nextProps`，你想要发出网络请求(network requests)时就可以发出, 当然你也可以不发出网络请求;
   * 注意
   * 如果`shouldComponentUpdate(nextProps, nextState)`返回`false`, 那么`componentDidUpdate(prevProps, prevState)`不会被触发;
   */
  componentDidUpdate = async () => {
    console.log('start componentDidUpdate:', new Date());
    // 网络请求
    // redux 操作
    // 对于 component 而已就是通过回调,通知父组件刷新
    // await Timer.sleep(1000);
    console.log('end componentDidUpdate:', new Date());
  }

  /**
   * 执行场景
   * 在组件卸载(unmounted)或销毁(destroyed)之前
   * 解释
   * 这个方法可以让你处理一些必要的清理操作，比如无效的timers、interval，或者取消网络请求，或者清理任何在`componentDidMount()`中创建的DOM元素(elements);
   */
  componentWillUnmount = () => {
    console.log('start componentWillUnmount:', new Date());
    // clearState
    // removeListener
    // clearTimer
    console.log('end componentWillUnmount:', new Date());
  }

  toggle(todoToToggle) {
    this.props.toggle(todoToToggle);
  }

  destroy(todo) {
    this.props.delTodo(todo.objectId);
  }

  edit (todo) {
    this.setState({editing: todo.objectId});
  }

  save(todoToSave, text) {
    this.props.editTodo(todoToSave, text);
    this.setState({editing: null});
  }

  cancel() {
    this.setState({editing: null});
  }

  handleChange(event) {
    this.setState({newTodo: event.target.value});
  }

  handleNewTodoKeyDown(event) {
    if (event.keyCode !== Consts.eventKey.ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = this.state.newTodo.trim();

    if (val) {
      this.props.addTodo(val);
      this.setState({newTodo: ''});
    }
  }

  renderTodoItems() {
    const { todos } = this.props;
    const shownTodos = todos.filter(function (todo) {
      switch (this.state.nowShowing) {
      case Consts.appStatus.ACTIVE_TODOS:
        return !todo.completed;
      case Consts.appStatus.COMPLETED_TODOS:
        return todo.completed;
      default:
        return true;
      }
    }, this);

    return shownTodos.map(function (todo) {
        return (
          <TodoItem
            key={todo.objectId}
            todo={todo}
            match={this.props.match}
            onToggle={this.toggle.bind(this, todo)}
            onDestroy={this.destroy.bind(this, todo)}
            onEdit={this.edit.bind(this, todo)}
            editing={this.state.editing === todo.objectId}
            onSave={this.save.bind(this, todo)}
            onCancel={this.cancel}
          />
        );
      }, this);
  }

  renderMain() {
    const { todos } = this.props;

    if (todos.length) {
      return (
        <section className="main">
          <ul className="todo-list">
            {this.renderTodoItems()}
          </ul>
        </section>
      );
    }

    return null;
  }

  renderFooter() {
    return (
      <div className="footer">
        footer
      </div>
    );
  }

  render() {
    console.log('render start');

    return (
      <div>
        <header className="header">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown.bind(this)}
            onChange={this.handleChange.bind(this)}
            autoFocus={true}
          />
        </header>
        {this.renderMain()}
      </div>
    );
  }
}

export default Todos
