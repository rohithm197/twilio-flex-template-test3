import { styled } from '@twilio/flex-ui';

export interface ThemeOnlyProps {
  theme?: any;
}


//Agent-activity-tile-component
export const TeamsViewTilesMainContainer = styled('div')<ThemeOnlyProps>`
  width: 100%;
  padding: 10px 28px 0px;
  position: absolute;
  top: 54px;
`;

export const TeamsViewTilesContainer = styled('div')<ThemeOnlyProps>`
  display: flex;
  width: fit-content;
  margin-top: ${({ theme }) => theme.tokens.spacings.space40};
  margin-bottom: ${({ theme }) => theme.tokens.spacings.space0};
  height: auto;
  box-sizing: border-box;
  flex: 0 0 auto;
  > * {
    flex: 1 1 25%;
  }
  > * + * {
    margin-left: ${({ theme }) => theme.tokens.spacings.space50};
  }
  ${(props) => props.theme.QueuesStats.TilesGrid}
`;

//Agent-activity-tile-component
export const TeamsHeaderTilesContainer = styled('div')<ThemeOnlyProps>`
  position: relative;
  top: 42px;
  z-index: 1;
`;
