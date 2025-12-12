class Test:
    def __init__(self, message):
        self.message = message
        
    def show_message(self):
        return self.message


def main():
    t = Test("Hello there!")
    print(t.show_message())


if __name__ == "__main__":
    main()