(function() {

	var GameBoard = function(rows, cols) {
		if((rows instanceof Number) && (cols instanceof Number)) {
			if(rows != cols)
				throw "Rows and columns must be equal";
			this.grid = [];
			this.players = 0;

			for(i=0; i < rows; i++)
			{
				for(k=0; k < cols; k++)
				{
					this.grid.push(new Cell(i, k));
				}
			}
		}
	}
	GameBoard.prototype.find = function(row, col) {
		for(i=0; i < this.grid.length; i++) {
			if((this.grid[i] instanceof Cell)) {
				cell = this.grid[i];
				if((cell.row == row) && (cell.col == col))
					return cell;
			}
		}
		return null;
	}

	/* Checks for a winning combination with each iteration of a player's turn */
	GameBoard.prototype.check = function() {
		matches = [];
		rows = this.rows;
		cols = this.cols;

		for(i=0; i < rows; i++)
		{
			for(k=0; k < cols; k++)
			{
				if(matches.length == 3)
					return true;

				cell = this.find(i, k);
				if(cell) {
					if(matches != null) {
						if(matches[0].symbol == cell.symbol) {
							matches.push(cell);
						}
					}
					else
						matches.push(cell);
				}
			}
		}

		matches = [];
		for(i=0; i < cols; i++)
		{
			for(k=0; k < rows; k++)
			{
				if(matches.length == 3)
					return true;

				cell = this.find(i, k);
				if(cell) {
					if(matches != null) {
						if(matches[0].symbol == cell.symbol) {
							matches.push(cell);
						}
					}
					else
						matches.push(cell);
				}
			}
		}
	}

	/* Cell class: represents a point on the gameboard */
	var Cell = function(row, col) {
		this.row = row;
		this.col = col;
		this.occupied = false;
		this.mark = null;
	}

	Cell.prototype.mark = function(player) {
		if(!(player instanceof Player))
			throw "Must be instance of Player";
		this.occupied = true;
		this.mark = player.symbol;
	}

	Cell.prototype.clear = function(row, col) {
		if((this.occupied) && (this.mark != null)) {
			this.occupied = false;
			this.mark = null;
		}
	}

	var Player = function(symbol) {
		if(!(symbol instanceof String))
			throw "Player symbol must be a string";
		this.symbol = symbol;
		this.wins = 0;
		this.losses = 0;
	} 

	Player.prototype.move = function(row, col, gameboard) {
		cell = gameboard.find(row, col);
		if((cell) && (!cell.occupied)) {
			cell.mark(this);
		}
	}
})