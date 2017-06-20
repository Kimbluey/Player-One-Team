// This creates module of ng
var app = angular.module('handsome', ['ng']);

// This allows the board to be created
app.controller('BoardCtrl', function($scope, Board){
	$scope.board = new Board;
});

(function() {
	var Board = (function() {
		var SIZE = 3;						// 3 x 3 board
		var EMPTY = ' ';					// Empty fill space
		var Player1 = 'O';					// Player1 (O)
     	var Player2 = 'X'; 					// Player2 (X)
		var marker = [Player1, Player2];	// To track current player
        var	Cell;							// A cell is a single box on the board
		
        // This starts the board
		function Board() {
			this.reset();
		}

		Cell = (function() {
			function Cell(player) {
				this.player = player;
				this.winning = false;
			}
			Cell.prototype.mark = function(player) {
				this.player = player;
			}
			Cell.prototype.hasIt = function() {
				return this.player != EMPTY;
			}
			return Cell;
		})();

		// Resetting the board for new game
		Board.prototype.reset = function() {
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
			var numPlayer1 = 0;
			var numPlayer2 = 0;

			for(var columnIndex = 0; columnIndex < SIZE; columnIndex++) {
				var cell = this.grid[rowIndex];
				cell = cell[columnIndex];
				var cellMarker = cell.player;
				if(cellMarker == EMPTY) {
					return false;
				}
				
				if(cellMarker == Player1) {
					numPlayer1++;
				} else if(cellMarker == Player2) {
					numPlayer2++;
				}
			}

			if(numPlayer1 == SIZE) {
				return Player1;
			} else if(numPlayer2 == SIZE) {
				return Player2;
			}
		};
		
		// A bunch of check winner conditions
		Board.prototype._checkColumn = function(columnIndex) {
			var numPlayer1 = 0;
			var numPlayer2 = 0;

			for(var rowIndex = 0; rowIndex < SIZE; rowIndex++) {
				var cell = this.grid[rowIndex][columnIndex];
				var cellMarker = cell.player;
				if(cellMarker == EMPTY) {
					return false;
				}
				
				if(cellMarker == Player1) {
					numPlayer1++;
				} else if(cellMarker == Player2) {
					numPlayer2++;
				}
			}

			if(numPlayer1 == SIZE) {
				return Player1;
			} else if(numPlayer2 == SIZE) {
				return Player2;
			}
		}

		Board.prototype._checkDiagonal1 = function() {
			var numPlayer1 = 0;
			var numPlayer2 = 0;

			for(var i = 0; i<SIZE; i++) {
				var cellMarker = this.grid[i][i].player;
				if(cellMarker == EMPTY) {
					return false;
				}
				
				if(cellMarker == Player1) {
					numPlayer1++;
				} else if(cellMarker == Player2) {
					numPlayer2++;
				}
			}

			if(numPlayer1 == SIZE) {
				return Player1;
			} else if(numPlayer2 == SIZE) {
				return Player2;
			}
		}

		Board.prototype._checkDiagonal2 = function() {
			var numPlayer1 = 0;
			var numPlayer2 = 0;

			for(var i = 0; i<SIZE; i++) {
				var cellMarker = this.grid[i][SIZE-i-1].player;
				if(cellMarker == EMPTY) {
					return false;
				}
				
				if(cellMarker == Player1) {
					numPlayer1++;
				} else if(cellMarker == Player2) {
					numPlayer2++;
				}
			}

			if(numPlayer1 == SIZE) {
				return Player1;
			} else if(numPlayer2 == SIZE) {
				return Player2;
			}
		}

		Board.prototype._setWinner = function(player) {
			this.cute = true;
			this.winning_player = player;
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
		
		// Mark the player on board - game switches players once a player
		// places their mark (X or O) in a cell
        Board.prototype.markDa = function() {
			return marker[this.currentPlayer];
		}
		
		// Check if the cells are already marked or if game is still on
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

	angular.module('handsome').factory('Board', function() {
		return Board;
	});
}).call(this);
