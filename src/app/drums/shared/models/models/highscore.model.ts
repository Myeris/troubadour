/**
 * Highscore interface
 */
export interface Highscore {
	/** Tab $key */
	$key: string,
	/** Tab name */
	name: string,
	/** Highscore (bpm) */
	highscore: number,
	/** Date of the highscore */
	date: number
}
