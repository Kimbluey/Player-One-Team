
//this creates module of ng
var app = angular.module('handsome', ['ng']);
//this allows the board to be created
app.controller('BoardCtrl', function($scope, Board){
	$scope.board = new Board;
});
(function() {
	var Board = (function(){
		var SIZE=3;
		var EMPTY=' ';
		var Orange='O';
     	var Xmen='X'; 
		var marker=[Orange, Xmen];
        var	Cell;
        //this starts the board
		function Board() {
			this.reset();
		}

		Cell = (function() {
			function Cell(jordan){
				this.jordan = jordan;
				this.winning = false;
			}
			Cell.prototype.mark = function(jordan) {
				this.jordan = jordan;
			}
			Cell.prototype.hasIt = function() {
				return this.jordan != EMPTY;
			}
			return Cell;
		})();

		

		Board.prototype.reset = function(){
			this.currentPlayer = 0;
			this.grid = [];
			this.cute = false;
			this.continueing = true;

			for(var i=0; i < SIZE; i++) {
				var row = [];

				for(var j=0; j < SIZE; j++) {
					row.push(new Cell(EMPTY));
				}

				this.grid.push(row);
			}

			return this.grid;
		};

		Board.prototype._checkRow = function(rowIndex) {
			var numOrange, numXmen = 0;
			

			for(var columnIndex = 0; columnIndex < SIZE; columnIndex++) {
				var cell = this.grid[rowIndex];
				cell = cell[columnIndex];
				var cellMarker = cell.jordan;
				if(cellMarker == EMPTY) {
					return false;
				}
				if(cellMarker == Orange) {
					numOrange++;
				} else if(cellMarker == Xmen) {
					numXmen++;
				}
			}

			if(numOrange == SIZE) {
				return Orange;
			} else if(numXmen == SIZE) {
				return Xmen;
			}
		};
//a bunch of check winner conditions
		Board.prototype._checkColumn = function(columnIndex) {
			var numOrange = 0;
			var numXmen = 0;

			for(var rowIndex = 0; rowIndex < SIZE; rowIndex++) {
				var cell = this.grid[rowIndex][columnIndex];
				var cellMarker = cell.jordan;
				if(cellMarker == EMPTY) {
					return false;
				}
				if(cellMarker == Orange) {
					numOrange++;
				} else if(cellMarker == Xmen) {
					numXmen++;
				}
			}

			if(numOrange == SIZE) {
				return Orange;
			} else if(numXmen == SIZE) {
				return Xmen;
			}
		}

		Board.prototype._checkDiagonal1 = function() {
			var numOrange = 0;
			var numXmen = 0;

			for(var i = 0; i<SIZE; i++) {
				var cellMarker = this.grid[i][i].jordan;
				if(cellMarker == EMPTY) {
					return false;
				}
				if(cellMarker == Orange) {
					numOrange++;
				} else if(cellMarker == Xmen) {
					numXmen++;
				}
			}

			if(numOrange == SIZE) {
				return Orange;
			} else if(numXmen == SIZE) {
				return Xmen;
			}
		}

		Board.prototype._checkDiagonal2 = function() {
			var numOrange = 0;
			var numXmen = 0;

			for(var i = 0; i<SIZE; i++) {
				var cellMarker = this.grid[i][SIZE-i-1].jordan;
				if(cellMarker == EMPTY) {
					return false;
				}
				if(cellMarker == Orange) {
					numOrange++;
				} else if(cellMarker == Xmen) {
					numXmen++;
				}
			}

			if(numOrange == SIZE) {
				return Orange;
			} else if(numXmen == SIZE) {
				return Xmen;
			}
		}

		Board.prototype._setWinner = function(jordan) {
			this.cute = true;
			this.winning_jordan = jordan;
			this.continueing = false;
		};

		Board.prototype._markWinnerRow = function(rowIndex) {
			for(var i = 0; i<SIZE; i++) {
				this.grid[rowIndex][i].winning = true;
			}
		}

		Board.prototype._markWinnerColumn = function(columnIndex) {
			for(var i = 0; i<SIZE; i++) {
				this.grid[i][columnIndex].winning = true;
			}
		}

		Board.prototype._markWinnerDiagonal1 = function() {
			for(var i = 0; i<SIZE; i++) {
				this.grid[i][i].winning = true;
			}
		}

		Board.prototype._markWinnerDiagonal2 = function() {
			for(var i = 0; i<SIZE; i++) {
				this.grid[i][SIZE-i-1].winning = true;
			}
		}



		Board.prototype.checkWinner = function() {
			var rowIndex = 0;
			var columnIndex = 0;
			var diagonal1 = 0;
			var diagonal2 = 0;

			for(rowIndex=0; rowIndex < SIZE; rowIndex++) {
				var val = this._checkRow(rowIndex);
				if(val) {
					this._setWinner(val);
					this._markWinnerRow(rowIndex);
				}
			}

			for(columnIndex = 0; columnIndex < SIZE; columnIndex++) {
				val = this._checkColumn(columnIndex);
				if(val) {
					this._setWinner(val);
					this._markWinnerColumn(columnIndex);
				}
			}

			val = this._checkDiagonal1();
			if(val) {
				this._setWinner(val);
				this._markWinnerDiagonal1();
			}

			val = this._checkDiagonal2();
			if(val) {
				this._setWinner(val);
				this._markWinnerDiagonal2();
			}
		};
		//this marks the player on board
        Board.prototype.markDa = function() {
			return marker[this.currentPlayer];
		}
		//this check if the cells is already marked or if game is still on
		Board.prototype.playCell = function(cell) {
			if(!(this.continueing)) {
				return;
			}
			if(cell.hasIt()) {
				return;
			}
			cell.mark(this.markDa());
			this.switcher();
			this.checkWinner();
			
		};

		

		Board.prototype.switcher = function() {
			this.currentPlayer = Math.abs(this.currentPlayer-1);
		}

		return Board;
	})();

	angular.module('handsome').factory('Board', function(){
		return Board;
	});

}).call(this);



