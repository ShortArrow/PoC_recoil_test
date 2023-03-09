import { atom, RecoilRoot, useRecoilState } from "recoil";
import { fireEvent, getByTestId, waitFor } from "@testing-library/react";
// https://github.com/testing-library/react-hooks-testing-library#a-note-about-react-18-support
import { render, getByText } from "@testing-library/react";
import { expect } from "vitest";
import toBInTheDocument from "testing-library__jest-dom";

const clickState = atom({
  key: "nameAtom",
  default: 0,
});

const ClickCounter = () => {
  const [clicks, setClicks] = useRecoilState(clickState);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  return (
    <div>
      <p>Clicks: {clicks}</p>
      <button data-testid="button" onClick={handleClick}>
        Click me
      </button>
    </div>
  );
};

describe("ClickCounter component", () => {
  it("should increment clicks when button is clicked", async () => {
    const { container } = render(
      <RecoilRoot>
        <ClickCounter />
      </RecoilRoot>
    );
    const button = getByTestId(container, "button");
    fireEvent.click(button);
    await waitFor(() => {
      const display = getByText(container, "Clicks: 1");
      expect(display).toBeInTheDocument();
    });
    fireEvent.click(button);
    await waitFor(() => {
      const display = getByText(container, "Clicks: 2");
      expect(display).toBeInTheDocument();
    });
  });
});
