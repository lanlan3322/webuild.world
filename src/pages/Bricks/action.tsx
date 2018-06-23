import * as constants from "../../constants";
import { getBricks, startWork } from "../../services/BrickService";
import { IBrick } from "../../types";

export interface IGetBricks {
  type: constants.GET_BRICKS;
  payload: {
    totalCount: number;
    bricks: IBrick[];
  };
}

export type BrickAction = IGetBricks;

export function retrieveBricks(start: number, length: number) {
  return async (dispatch: any): Promise<IGetBricks> => {
    const payload = await getBricks(start, length);
    return dispatch({
      payload,
      type: constants.GET_BRICKS
    });
  };
}

export function startWorkForBrick(
  brickId: number,
  builderId: string,
  builderName: string
) {
  return async (dispatch: any): Promise<void> => {
    const result = await startWork(brickId, builderId, builderName);
    return dispatch({
      payload: { result },
      type: constants.START_WORK
    });
  };
}
