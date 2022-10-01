using UnityEngine;
using UnityEngine.UI;

public class Nickname : MonoBehaviour
{
    //Text가 표시될 지점
    public Transform target;
    public Camera camera;

    //타겟 지점으로부터 지정된 값 만큼 offset 시킬 변수
    public float offsetX = 0;
    public float offsetY = 0;
    public float offsetZ = 0;

    void Update()
    {
        //2D 포인트 얻어오기
        Vector3 screenPos = camera.WorldToScreenPoint(new Vector3(target.position.x + offsetX, target.position.y + offsetY, target.position.z + offsetZ));

        transform.position = new Vector3(screenPos.x, screenPos.y, transform.position.z);

        
    }
}
