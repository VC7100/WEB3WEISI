import pyautogui
import time

time.sleep(2)
screenWidth, screenHeight = pyautogui.size()
currentMouseX, currentMouseY = pyautogui.position()

try:
        for i in range(0,4):
                for j in range(0,4):
                        pyautogui.moveTo(255,925)
                        pyautogui.click()
                        time.sleep(40)
                        pyautogui.moveTo(480,170)
                        pyautogui.click()
                        time.sleep(1)
                        pyautogui.moveTo(815,925)
                        pyautogui.click()
                        time.sleep(40)
                        pyautogui.moveTo(480,170)
                        pyautogui.click()
                        time.sleep(1)
                        pyautogui.moveTo(1425,925)
                        
                        pyautogui.click()
                        time.sleep(40)
                        pyautogui.moveTo(480,170)
                        pyautogui.click()
                        time.sleep(1)
                        
                pyautogui.scroll(-795)
except:
        print("error")


