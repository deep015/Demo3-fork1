### Well hello there!
      case StepType.CustomStep: {
        const { dispose, querySelectorsAll } =
          createDisposableQuerySelectorsAll(localFrame);

        try {
          await this.executeCustomStep({
            step,
            mainPage,
            targetPageOrFrame,
            localFrame,
            timeout,
            startWaitingForEvents,
            querySelectorsAll,
          });
        } finally {
          await dispose();
        }

        break;
      }      case StepType.CustomStep: {
        const { dispose, querySelectorsAll } =
          createDisposableQuerySelectorsAll(localFrame);

        try {
          await this.executeCustomStep({
            step,
            mainPage,
            targetPageOrFrame,
            localFrame,
            timeout,
            startWaitingForEvents,
            querySelectorsAll,
          });
        } finally {
          await dispose();
        }

        break;
      }  executeCustomStep: (opts: {
    step: CustomStep;
    mainPage: Page;
    targetPageOrFrame: Page | Frame;
    localFrame: Frame;
    timeout: number;

    startWaitingForEvents: () => void;
    querySelectorsAll: (
      selectors: Selector[]
    ) => Promise<ElementHandle<Element>[]>;
  }) => Promise<void> = async () => {};function createDisposableQuerySelectorsAll(localFrame: Frame): {
  querySelectorsAll: (
    selectors: Selector[]
  ) => Promise<ElementHandle<Element>[]>;
  dispose: () => Promise<void>;
} {
  const toDispose: ElementHandle<Element>[] = [];
  async function _querySelectorsAll(
    selectors: Selector[]
  ): Promise<ElementHandle<Element>[]> {
    const elements = await querySelectorsAll(selectors, localFrame);
    toDispose.push(...elements);
    return elements;
  }
  async function dispose(): Promise<void> {
    await Promise.all(toDispose.map((element) => element.dispose()));
  }
  return { querySelectorsAll: _querySelectorsAll, dispose };
}
This repository is meant to provide an example for *forking* a repository on GitHub.

Creating a *fork* is producing a personal copy of someone else's project. Forks act as a sort of bridge between the original repository and your personal copy. You can submit *Pull Requests* to help make other people's projects better by offering your changes up to the original project. Forking is at the core of social coding at GitHub.

After forking this repository, you can make some changes to the project, and submit [a Pull Request](https://github.com/octocat/Spoon-Knife/pulls) as practice.

For some more information on how to fork a repository, [check out our guide, "Forking Projects""](http://guides.github.com/overviews/forking/). Thanks! :sparkling_heart:
