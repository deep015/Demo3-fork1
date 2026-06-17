import numpy as np

# Simulating data flowing into a neural network layer (2 batches of 2 features)
inputs = np.array([[1.0, 2.0], 
                   [3.0, 4.0]])

# Simulating the network's weights (learned parameters that process data)
weights = np.array([[0.5, 0.2], 
                    [0.1, 0.9]])

# Perform Dot Product Matrix Multiplication (The core operation of deep learning)
output = np.dot(inputs, weights)

print("\n--- AI Model Matrix Math Output ---")
print(output)
print("-----------------------------------\n")
