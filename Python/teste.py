from sys import stdin, stdout

while True:
    message = stdin.readline()

    stdout.write('Olá Node! Recebi sua mensagem: ' + message)
    stdout.flush()
# stdin (input)
# stdout (ouput)
# stderr (error message)