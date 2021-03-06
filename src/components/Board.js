import React, { Component } from "react";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardDim: 0,
      boardHeight: "600px",
      boardWidth: "600px",
      tileDim: "150px",
      theChosenTileColor: ["rgba(0, 0, 0, 0.7)", "rgba(255, 255, 255, 0.7)"]
    };
  }

  renderingThesquares() {
    const arri = [];
    const arrj = [];
    for (let i = 0; i < this.state.boardDim; i++) {
      for (let j = 0; j < this.state.boardDim; j++) {
        arrj.push(j);
        arri.push(i);
      }
    }
    return arri.map((el, i) => {
      return (
        <div key={i} style={this.squareDimentions(el, i, this.state.boardDim)}>
          {this.props.theRook(
            "poss" + el + arrj[i],
            this.props.displaySolution,
            this.props.pieceType
          )}
        </div>
      );
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("NEXT", nextProps);
    if (this.state.theChosenTileColor !== nextProps.tileColor) {
      this.setState({ theChosenTileColor: nextProps.tileColor });
    }
    if (this.props.boardDim !== nextProps.boardDim) {
      this.setState({ boardDim: nextProps.boardDim });
      if (nextProps.boardDim <= 4) {
        this.setState((prevState, props) => {
          return {
            boardWidth: 600 / 4 * props.boardDim + "px",
            boardHeight: 600 / 4 * props.boardDim + "px",
            tileDim: "150px"
          };
        });
      } else {
        this.setState((prevState, props) => {
          return {
            boardWidth: "600px",
            boardHeight: "600px",
            tileDim: 150 / props.boardDim * 4 + "px"
          };
        });
      }
    }
  }

  boardDimentions = () => {
    return {
      width: this.state.boardWidth,
      height: this.state.boardHeight,
      display: "flex",
      flexWrap: "wrap",
      border: "solid",
      borderWidth: "thin"
    };
  };

  sortingTheTileColor(el, i, dim) {
    if (dim % 2 === 0) {
      return el % 2
        ? i % 2
          ? this.state.theChosenTileColor[0]
          : this.state.theChosenTileColor[1]
        : i % 2
          ? this.state.theChosenTileColor[1]
          : this.state.theChosenTileColor[0];
    } else {
      return i % 2
        ? this.state.theChosenTileColor[1]
        : this.state.theChosenTileColor[0];
    }
  }

  squareDimentions(el, i, dim) {
    return {
      width: this.state.tileDim,
      height: this.state.tileDim,
      display: "grid",
      grid: "repeat(2, 60px) / auto-flow 80px",
      // justifyContent: "center",
      // alignItems: "center",
      backgroundColor: this.sortingTheTileColor(el, i, dim)
    };
  }

  render() {
    console.log("pT", this.props.pieceType);
    return (
      <div style={this.boardDimentions()} className="Board">
        {this.renderingThesquares()}
      </div>
    );
  }
}

export default Board;
